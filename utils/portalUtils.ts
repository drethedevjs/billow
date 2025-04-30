import store from "@/app/store/configureStore";

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
