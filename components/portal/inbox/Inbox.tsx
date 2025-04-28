"use client";
import { InboxItem } from "@/interfaces/InboxItem";
import { faker } from "@faker-js/faker";
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
import store from "./store";

function generateInboxItems(): InboxItem[] {
  return Array.from({ length: 10 }, () => ({
    id: faker.number.int(),
    subject: faker.lorem.words(),
    sender: faker.internet.email(),
    date: faker.date.recent({ days: 30 }),
    message: faker.lorem.paragraph()
  })).sort((a, b) => b.date.getTime() - a.date.getTime());
}

const inbox = generateInboxItems();

const Inbox = () => {
  const [message, setMessage] = useState<InboxItem | null>(null);
  console.log("My Store: ", store.getState());

  const openEmail = (selectedEmail: InboxItem) => {
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
              {inbox.map((msg: InboxItem) => {
                return (
                  <TableRow
                    key={msg.id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    onClick={() => openEmail(msg)}
                  >
                    <TableCell>
                      {moment(msg.date).format("MM-DD-yyyy")}
                    </TableCell>
                    <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {msg.sender}
                    </TableCell>
                    <TableCell>{msg.subject}</TableCell>
                    <TableCell>{msg.message.slice(0, 20) + "..."}</TableCell>
                    <TableCell>
                      <a
                        href="#"
                        className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                      >
                        <BiTrash color="red" />
                      </a>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        {message ? (
          <textarea
            rows={20}
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
