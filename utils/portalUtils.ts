import store from "@/components/portal/inbox/store";

const portalUtils = {
  getInboxNewMessageCount: (setInboxCount: (storeLength: string) => void) => {
    return store.subscribe(() => {
      setInboxCount(
        store
          .getState()
          .filter((msg) => !msg.read)
          .length.toString()
      );
    });
  }
};

export default portalUtils;
