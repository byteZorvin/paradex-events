//  --- Add your pg table schemas here ----

import { bigint, pgTable, text, uuid, timestamp } from "drizzle-orm/pg-core";

// LogMessageToL1 event table
export const LogMessageToL1 = pgTable("log_message_to_l1", {
  _id: uuid("id").primaryKey().defaultRandom(),
  fromAddress: text("from_address"),
  toAddress: text("to_address"),
  payload: text("payload"),
  endCursor: text("end_cursor"),
  uniqueKey: text("unique_key"),
  timestamp: timestamp("timestamp").defaultNow(),
});

// LogMessageToL2 event table
export const LogMessageToL2 = pgTable("log_message_to_l2", {
  _id: uuid("id").primaryKey().defaultRandom(),
  fromAddress: text("from_address"),
  toAddress: text("to_address"),
  selector: text("selector"),
  payload: text("payload"),
  nonce: text("nonce"),
  fee: text("fee"),
  endCursor: text("end_cursor"),
  uniqueKey: text("unique_key"),
  timestamp: timestamp("timestamp").defaultNow(),
});

// ConsumedMessageToL1 event table
export const ConsumedMessageToL1 = pgTable("consumed_message_to_l1", {
  _id: uuid("id").primaryKey().defaultRandom(),
  fromAddress: text("from_address"),
  toAddress: text("to_address"),
  payload: text("payload"),
  endCursor: text("end_cursor"),
  uniqueKey: text("unique_key"),
  timestamp: timestamp("timestamp").defaultNow(),
});

// ConsumedMessageToL2 event table
export const ConsumedMessageToL2 = pgTable("consumed_message_to_l2", {
  _id: uuid("id").primaryKey().defaultRandom(),
  fromAddress: text("from_address"),
  toAddress: text("to_address"),
  selector: text("selector"),
  payload: text("payload"),
  nonce: text("nonce"),
  endCursor: text("end_cursor"),
  uniqueKey: text("unique_key"),
  timestamp: timestamp("timestamp").defaultNow(),
});

// MessageToL2CancellationStarted event table
export const MessageToL2CancellationStarted = pgTable("message_to_l2_cancellation_started", {
  _id: uuid("id").primaryKey().defaultRandom(),
  fromAddress: text("from_address"),
  toAddress: text("to_address"),
  selector: text("selector"),
  payload: text("payload"),
  nonce: text("nonce"),
  endCursor: text("end_cursor"),
  uniqueKey: text("unique_key"),
  timestamp: timestamp("timestamp").defaultNow(),
});

// MessageToL2Canceled event table
export const MessageToL2Canceled = pgTable("message_to_l2_canceled", {
  _id: uuid("id").primaryKey().defaultRandom(),
  fromAddress: text("from_address"),
  toAddress: text("to_address"),
  selector: text("selector"),
  payload: text("payload"),
  nonce: text("nonce"),
  endCursor: text("end_cursor"),
  uniqueKey: text("unique_key"),
  timestamp: timestamp("timestamp").defaultNow(),
});

// export {};
