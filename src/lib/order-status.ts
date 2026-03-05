const STATUS_TRANSITIONS: Record<string, string[]> = {
  PENDING_PAYMENT: ["SCOPE_REVIEW", "CANCELLED"],
  SCOPE_REVIEW: ["IN_PROGRESS", "CANCELLED"],
  IN_PROGRESS: ["REVIEW", "CANCELLED"],
  REVIEW: ["REVISION", "COMPLETED"],
  REVISION: ["IN_PROGRESS"],
  COMPLETED: [],
  CANCELLED: [],
};

export function isValidTransition(from: string, to: string): boolean {
  return STATUS_TRANSITIONS[from]?.includes(to) ?? false;
}
