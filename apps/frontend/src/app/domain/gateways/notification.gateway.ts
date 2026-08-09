/** Notifications utilisateur (toasts), émises par les use-cases. */
export abstract class NotificationGateway {
  abstract error(detail: string): void;
}
