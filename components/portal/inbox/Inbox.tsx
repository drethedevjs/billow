"use client";
import { InboxItem } from "@/interfaces/InboxItem";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow
} from "flowbite-react";
import moment from "moment";
import { useEffect, useState } from "react";
import { BiTrash } from "react-icons/bi";
import { BsEnvelopeArrowDown, BsEnvelopeArrowUpFill } from "react-icons/bs";
import inboxActions from "./actions";
import store from "./store";

const Inbox = () => {
  const [inboxMessages, setInboxMessages] = useState<InboxItem[]>(
    store.getState()
  );

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setInboxMessages(store.getState());
    });

    return () => unsubscribe();
  }, []);

  const [message, setMessage] = useState<InboxItem | null>(null);

  const deleteMessage = (messageId: number) => {
    store.dispatch(inboxActions.deleteMessage(messageId));
    setInboxMessages(inboxMessages.filter((msg) => msg.id !== messageId));
  };

  const openEmail = (selectedEmail: InboxItem) => {
    if (!selectedEmail.read) {
      store.dispatch(inboxActions.markRead(selectedEmail.id));
      selectedEmail.read = true;
    }

    setMessage(selectedEmail);
  };

  const markUnread = (
    e: React.MouseEvent<HTMLButtonElement>,
    messageId: number
  ) => {
    e.stopPropagation(); // Allow users to click icon without showing the message in the viewer.
    store.dispatch(inboxActions.markUnread(messageId));
  };

  const markRead = (
    e: React.MouseEvent<HTMLButtonElement>,
    messageId: number
  ) => {
    e.stopPropagation(); // Allow users to click icon without showing the message in the viewer.
    store.dispatch(inboxActions.markRead(messageId));
  };

  return (
    <>
      <h1 className="mb-5">Inbox</h1>

      <div className="overflow-x-auto">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeadCell>Date</TableHeadCell>
              <TableHeadCell>Sender</TableHeadCell>
              <TableHeadCell>Subject</TableHeadCell>
              <TableHeadCell>Message</TableHeadCell>
              <TableHeadCell>
                <span className="sr-only">View</span>
              </TableHeadCell>
            </TableRow>
          </TableHead>
        </Table>
        <div className="h-72 overflow-scroll inset-shadow-sm/50 border-b-primary border-b-2">
          <Table hoverable>
            <TableBody className="divide-y">
              {inboxMessages.map((msg: InboxItem) => {
                return (
                  <TableRow
                    key={msg.id}
                    className={`bg-white dark:border-gray-700 dark:bg-gray-800 text-black ${
                      msg.read ? "italic" : "font-bold"
                    }`}
                    onClick={() => openEmail(msg)}
                  >
                    <TableCell>
                      {moment(msg.date).format("MM-DD-yyyy h:MM a")}
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-gray-900 dark:text-white">
                      {msg.sender}
                    </TableCell>
                    <TableCell>{msg.subject}</TableCell>
                    <TableCell>{msg.message.slice(0, 20) + "..."}</TableCell>
                    <TableCell className="flex justify-between">
                      {msg.read ? (
                        <button
                          title="Mark unread"
                          onClick={(e) => markUnread(e, msg.id)}
                          className="font-medium text-error hover:underline dark:text-error"
                        >
                          <BsEnvelopeArrowDown />
                        </button>
                      ) : (
                        <button
                          title="Mark read"
                          onClick={(e) => markRead(e, msg.id)}
                          className="font-bold text-accent hover:underline dark:text-cyan-500"
                        >
                          <BsEnvelopeArrowUpFill fontWeight="fill" />
                        </button>
                      )}
                      <button
                        onClick={() => deleteMessage(msg.id)}
                        className="font-medium hover:underline"
                      >
                        <BiTrash color="red" />
                      </button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        {message ? (
          <textarea
            rows={10}
            className="w-full border-2 border-primary p-5 mt-3"
            value={message.message}
            readOnly
          ></textarea>
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
};

export default Inbox;
