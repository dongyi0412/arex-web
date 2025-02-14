import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export type Message = {
  type: string;
  message: string;
};

type MessageQueueState = {
  messageQueue: Message[];
};

type MessageQueueAction = {
  pushMessage: (message: Message) => void;
  setMessageQueue: (messageQueue: Message[]) => void;
};

const initialState: MessageQueueState = {
  messageQueue: [],
};

const useMessageQueue = create(
  immer<MessageQueueState & MessageQueueAction>((set, get) => ({
    ...initialState,
    pushMessage: (message) => {
      set((state) => {
        state.messageQueue.push(message);
      });
    },
    setMessageQueue: (messageQueue) =>
      set((state) => {
        state.messageQueue = messageQueue;
      }),
  })),
);

export default useMessageQueue;
