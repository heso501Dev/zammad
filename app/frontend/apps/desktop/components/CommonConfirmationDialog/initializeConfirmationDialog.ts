// Copyright (C) 2012-2024 Zammad Foundation, https://zammad-foundation.org/

import { watch } from 'vue'
import { useRoute } from 'vue-router'

import { useConfirmation } from '#shared/composables/useConfirmation.ts'

import { closeDialog, useDialog } from '../CommonDialog/useDialog.ts'

const confirmationDialogPerRoute = new Map<string, Set<string>>()

export const initializeConfirmationDialog = () => {
  const { triggerConfirmation, lastConfirmationUuid } = useConfirmation()

  const route = useRoute()

  const confirmationDialog = useDialog({
    name: 'confirmation',
    component: () => import('./CommonConfirmationDialog.vue'),
    global: true,
    afterClose: (uniqueId) => {
      if (!uniqueId) return

      const dialogs = confirmationDialogPerRoute.get(route.path)
      if (!dialogs) return

      dialogs.delete(uniqueId)
      if (dialogs.size === 0) {
        confirmationDialogPerRoute.delete(route.path)
      }
    },
  })

  watch(triggerConfirmation, () => {
    if (!lastConfirmationUuid.value) return

    if (!confirmationDialogPerRoute.has(route.path)) {
      confirmationDialogPerRoute.set(route.path, new Set<string>())
    }
    confirmationDialogPerRoute.get(route.path)!.add(lastConfirmationUuid.value)

    confirmationDialog.open({
      uniqueId: lastConfirmationUuid.value,
    })
  })
}

export const cleanupRouteDialogs = async (routePath: string) => {
  const dialogs = confirmationDialogPerRoute.get(routePath)
  if (!dialogs || dialogs.size === 0) return

  // Convert the set to an array, then map over it
  const closePromises = Array.from(dialogs).map((dialogUuid) =>
    closeDialog(`confirmation:${dialogUuid}`, true),
  )

  await Promise.all(closePromises)
}
