declare module 'redis-smq' {
  export class Message {
    public PROPERTY_TTL: string;
    public PROPERTY_RETRY_THRESHOLD: string;
    public PROPERTY_RETRY_DELAY: string;
    public PROPERTY_CONSUME_TIMEOUT: string;
    public PROPERTY_BODY: string;
    public PROPERTY_UUID: string;
    public PROPERTY_ATTEMPTS: string;
    public PROPERTY_CREATED_AT: string;
    public PROPERTY_SCHEDULED_CRON: string;
    public PROPERTY_SCHEDULED_DELAY: string;
    public PROPERTY_SCHEDULED_PERIOD: string;
    public PROPERTY_SCHEDULED_REPEAT: string;
    public PROPERTY_SCHEDULED_REPEAT_COUNT: string;
    public PROPERTY_DELAYED: string;

    public getTTL(): number;
    public getRetryThreshold(): number;
    public getRetryDelay(): number;
    public getConsumeTimeout(): number;
    public getBody(): any;
    public getId(): string;
    public getAttempts(): number;
    public getCreatedAt(): number;
    public getMessageScheduledCRON(): string;
    public getMessageScheduledDelay(): number;
    public getMessageScheduledPeriod(): number;
    public getMessageScheduledRepeat(): number;
    public isDelayed(): boolean;
    public getProperty(): any;

    public createFromMessage(m: Message): Message;
    public setScheduledPeriod(p: number): Message;
    public setScheduledDelay(d: number): Message;
    public setScheduledCron(c: string): Message;
    public setScheduledRepeat(r: number): Message;
    public setTTL(ttl: number): Message;
    public setRetryThreshold(retry: number): Message;
    public setRetryDelay(s: number): Message;
    public setConsumeTimeout(ms: number): Message;
    public setBody(body: any): Message;

    public toString(): string;
  }

  export class Producer {
    public id: string;
    public queueName: string;
    public config: RedisSMQConfig;
    public isTest: boolean;

    public constructor(queueName: string, config: RedisSMQConfig);
    public produceMessage(message: Message, cb: (err?: Error) => void): void;
    public shutdown(): void;
  }

  export class Consumer {
    public id: string;
    public static queueName: string;
    public config: RedisSMQConfig;
    public options: ConsumerConfig;
    public messageConsumeTimeout?: number;
    public messageTTL?: number;
    public messageRetryThreshold: number;
    public messageRetryDelay?: number;
    public isTest: boolean;

    public constructor(config?: RedisSMQConfig, options?: ConsumerConfig);
    public run(): void;
    protected consume(message: any, cb: (err?: Error) => void): void;
    public shutdown(): void;
    public isRunning(): boolean;
  }
}

declare interface ConsumerConfig {
  messageConsumeTimeout?: number;
  messageTTL?: number;
  messageRetryThreshold?: number;
  messageRetryDelay?: number;
}

declare interface RedisSMQConfig {
  namespace?: string;
  redis?: {
    driver?: string;
    options?: {
      host?: string;
      password?: string;
      url?: string;
      port?: number;
      connect_timeout?: number;
    };
  };
  log?: {
    enabled?: number;
    options?: {
      level?: string;
    };
  };
  monitor?: {
    enabled?: boolean;
    host?: string;
    port?: number;
  };
}
