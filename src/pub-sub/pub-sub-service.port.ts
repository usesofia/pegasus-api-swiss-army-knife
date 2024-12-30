export interface PubSubServicePort {
  publish({
    topic,
    payload,
    correlationId,
  }: {
    topic: string;
    payload: Record<string, any>;
    correlationId?: string;
  }): Promise<void>;
  unsafePublish({
    topic,
    payload,
  }: {
    topic: string;
    payload: Record<string, any>;
  }): void;
  flushPublishBuffer({ max }: { max?: number }): Promise<void>;
  stopAutoFlushPublishBuffer(): Promise<void>;
}

export const PUB_SUB_SERVICE_PORT = Symbol('PubSubServicePort');
