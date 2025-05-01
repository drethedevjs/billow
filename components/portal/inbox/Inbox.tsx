"use client";
import { InboxItem } from "@/interfaces/InboxItem";
import { inboxSlice } from "@/store/inbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow
} from "flowbite-react";
import moment from "moment";
import { useState } from "react";
import { BiTrash } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/configureStore";
import EnvelopeIcons from "./icons/EnvelopeIcons";
import StarIcons from "./icons/StarIcons";

const Inbox = () => {
  const dispatch = useDispatch();
  const inboxMessages = useSelector((state: RootState) => state.inbox);
  const { deleteMessage, markRead } = inboxSlice.actions;

  const [message, setMessage] = useState<InboxItem | null>(null);

  const deleteMsg = (messageId: number) => {
    dispatch(deleteMessage(messageId));
  };

  const openEmail = (selectedEmail: InboxItem) => {
    if (!selectedEmail.read) {
      dispatch(markRead(selectedEmail.id));
    }

    setMessage(selectedEmail);
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
              {!inboxMessages.length ? (
                <TableRow className="p-10">
                  <TableCell>You have no messages in your inbox.</TableCell>
                </TableRow>
              ) : (
                inboxMessages.map((msg: InboxItem) => {
                  return (
                    <TableRow
                      key={msg.id}
                      className={` bg-white dark:border-gray-700 dark:bg-gray-800 text-black ${
                        msg.read ? "italic" : "font-bold"
                      } ${msg.important ? "!bg-yellow-100" : ""}`}
                    >
                      <TableCell onClick={() => openEmail(msg)}>
                        {moment(new Date(msg.date)).format(
                          "MMMM Do YYYY, h:mm a"
                        )}
                      </TableCell>
                      <TableCell
                        onClick={() => openEmail(msg)}
                        className="whitespace-nowrap text-gray-900 dark:text-white"
                      >
                        {msg.sender}
                      </TableCell>
                      <TableCell onClick={() => openEmail(msg)}>
                        {msg.subject}
                      </TableCell>
                      <TableCell onClick={() => openEmail(msg)}>
                        {msg.message.slice(0, 20) + "..."}
                      </TableCell>
                      <TableCell className="flex justify-between">
                        <StarIcons id={msg.id} important={msg.important} />
                        <EnvelopeIcons id={msg.id} read={msg.read} />

                        <button
                          onClick={() => deleteMsg(msg.id)}
                          className="font-medium hover:underline"
                        >
                          <BiTrash color="red" />
                        </button>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
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
