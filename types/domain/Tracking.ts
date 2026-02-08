/**
 * Tracking Status Enum
 *
 * Represents the overall status of a shipment.
 */
export enum TrackingStatus {
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  ORIGIN = 'ORIGIN',
  RETURN = 'RETURN',
  INCIDENCE = 'INCIDENCE',
}

/**
 * Tracking Event
 *
 * Represents a single event in the shipment's tracking history.
 */
export interface TrackingEvent {
  /** Code is the courier-specific status code for this event */
  code: string
  /** Text is the description of the tracking event */
  text: string
  /** Date is the timestamp when the event occurred */
  date: string
  /** City is the location where the event occurred */
  city: string
}

/**
 * Tracking History
 *
 * Contains the complete tracking history for a shipment.
 */
export interface TrackingHistory {
  /** GlobalStatus is the overall status of the shipment */
  global_status: TrackingStatus
  /** History contains the chronological events for the shipment */
  history: TrackingEvent[]
}
