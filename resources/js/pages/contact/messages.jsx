"use client";

import { useState } from "react";
import AppLayout from '@/layouts/app-layout';
import AdminHeader from "@/components/admin-header"
import { ConfirmationModal } from "../../components/confirmation-modal";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, Trash2, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { useForm } from "@inertiajs/react";

export default function MessagesPage({messages}) {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewedMessage, setViewedMessage] = useState(null);


const { put , delete:destroy } = useForm(
   {
     status:"",

   }
);



  const handleDelete = (e) => {
    setSelectedMessage(e);
    setDeleteModalOpen(true);
};




const handleUpdate = (e) => {

    put((route('contact.update', e)) ,
    { onSuccess: () => {
        setViewModalOpen(false)
      },}
);

};


  const confirmDelete = () => {
    console.log(selectedMessage);

    destroy(route('contact.destroy' ,selectedMessage ))

  };

  const viewMessage = (message) => {
      setViewModalOpen(true);
    setViewedMessage(message);
  };


  const getStatusIcon = (status) => {
    switch (status) {
      case "unread":
        return <AlertCircle className="h-4 w-4 text-blue-500" />;
      case "read":
        return <CheckCircle className="h-4 w-4 text-gray-500" />;
      case "replied":
        return <Clock className="h-4 w-4 text-green-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "unread":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            Unread
          </Badge>
        );
      case "read":
        return (
          <Badge variant="outline" className="text-gray-500 hover:bg-gray-100">
            Read
          </Badge>
        );
      case "replied":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            Replied
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <AppLayout>
      <AdminHeader title="Messages" description="Manage contact form messages" />

      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All Messages</TabsTrigger>
          <TabsTrigger value="unread">Unread</TabsTrigger>
          <TabsTrigger value="read">Read</TabsTrigger>
          <TabsTrigger value="replied">Replied</TabsTrigger>
        </TabsList>

        {["all", "unread", "read", "replied"].map((tab) => (
          <TabsContent key={tab} value={tab} className="mt-6">
            <div className="space-y-4">
              {messages
                .filter((m) => tab === "all" || m.status === tab)
                .map((message) => (
                  <Card key={message.id} className="p-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div className="flex items-start gap-3">
                        <div className="mt-1">{getStatusIcon(message.status)}</div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{message.subject}</h3>
                            {getStatusBadge(message.status)}
                          </div>
                          <p className="text-sm text-gray-500 mt-1">
                            From: {message.name} ({message.email})
                          </p>
                          <p className="text-sm text-gray-500">
                            Date: {new Date(message.created_at).toLocaleDateString()}
                            </p>

                          <p className="text-sm mt-2 line-clamp-2">
                            {message.message}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0 flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center"
                          onClick={() => viewMessage(message)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center text-red-600 border-red-200 hover:bg-red-50"
                          onClick={() => handleDelete(message.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>


      {viewModalOpen && viewedMessage && (
        console.log(viewModalOpen),
        console.log(viewedMessage),
        <div
          className={`fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 ${viewModalOpen ? "block" : "hidden"}`}
        >
          <div
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{viewedMessage.subject}</h3>
                  <p className="text-sm text-gray-500">
                    From: {viewedMessage.name} ({viewedMessage.email})
                  </p>
                  <p className="text-sm text-gray-500 mb-4">Date: {new Date(viewedMessage.created_at).toLocaleDateString()}</p>
                </div>
                {getStatusBadge(viewedMessage.status)}
              </div>

              <div className="border-t border-b py-4 my-4">
                <p className="whitespace-pre-line">{viewedMessage.message}</p>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setViewModalOpen(false)}>
                  Close
                </Button>
                <div className="flex gap-2">
                  <Button onClick={() => handleUpdate(viewedMessage.id)} variant="outline" className="flex items-center" >
                    <CheckCircle  className="h-4 w-4 mr-1" />
                    Mark as {viewedMessage.status === "unread" ? "Read" : "Unread"}
                  </Button>
                  <Button className="bg-[#03329b] hover:bg-[#03329b]/90">Reply</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <ConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Message"
        message="Are you sure you want to delete this message? This action cannot be undone."
        confirmText="Delete"
        type="danger"
      />
    </AppLayout>
  );
}

