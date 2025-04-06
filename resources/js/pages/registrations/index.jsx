"use client"

import { useState } from "react"
import AppLayout from "@/layouts/app-layout";
import AdminHeader from "@/components/admin-header"
import { ConfirmationModal } from "../../components/confirmation-modal"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Eye, Download, Mail } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Link } from "@inertiajs/react";

export default function RegistrationsPage({ editions, registrations }) {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [selectedRegistration, setSelectedRegistration] = useState(null)
  const [selectedEdition, setSelectedEdition] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")


  // const filteredRegistrations = registrations
  // .filter(registration => 
  //   // More flexible edition filter
  //   !selectedEdition || // Show all if no edition selected
  //   registration.edition_id?.toString() === selectedEdition.toString() // Compare as strings
  // )
  // .filter(registration => 
  //   searchQuery === "" ||
  //   `${registration.first_name || ''} ${registration.last_name || ''}`
  //     .toLowerCase()
  //     .includes(searchQuery.toLowerCase()) ||
  //   (registration.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
  //   (registration.company || '').toLowerCase().includes(searchQuery.toLowerCase())
  // )
  // .filter(registration => 
  //   filterStatus === "all" || 
  //   registration.status === filterStatus
  // );

  const filteredRegistrations = registrations
  .filter(registration => 
    selectedEdition === "all" || // Show all if "all" is selected
    registration.edition_id?.toString() === selectedEdition.toString() // Compare as strings
  )
  .filter(registration => 
    searchQuery === "" ||
    `${registration.first_name || ''} ${registration.last_name || ''}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase()) ||
    (registration.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (registration.company || '').toLowerCase().includes(searchQuery.toLowerCase())
  )
  .filter(registration => 
    filterStatus === "all" || 
    registration.status === filterStatus
  );
  
  console.log(filteredRegistrations);
  
  // const handleDelete = (id) => {
  //   setSelectedRegistration(id)
  //   setDeleteModalOpen(true)
  // }

  const confirmDelete = () => {
    // Inertia delete request
    router.delete(`/admin/registrations/${selectedRegistration}`)
    setDeleteModalOpen(false)
  }

  const getStatusBadge = (status) => {
    const colors = {
      confirmed: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      cancelled: "bg-red-100 text-red-800",
      attended: "bg-blue-100 text-blue-800",
    }

    return (
      <Badge className={colors[status] || "bg-gray-100 text-gray-800"}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  // const getTicketTypeBadge = (ticket_type) => {
  //   const colors = {
  //     vip: "bg-purple-100 text-purple-800",
  //     professional: "bg-blue-100 text-blue-800",
  //     student: "bg-green-100 text-green-800",
  //   }

  //   return <Badge className={colors[ticket_type] || "bg-gray-100 text-gray-800"}>
  //     {ticket_type.charAt(0).toUpperCase() + ticket_type.slice(1)}
  //   </Badge>
  // }

  return (
    <AppLayout>
      <AdminHeader
        title="Registrations Management"
        description="Manage your conference registrations"
       
      />

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Select value={selectedEdition} onValueChange={setSelectedEdition}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Edition" />
          </SelectTrigger>
          <SelectContent>
              <SelectItem value="all">All Editions</SelectItem>
            {editions.map((edition) => (
              
              <SelectItem key={edition.id} value={edition.id}>
                {edition.year} Edition
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
            <SelectItem value="attended">Attended</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex-1">
          <Input
            placeholder="Search registrations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>

      </div>

      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                {/* <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ticket Type</th> */}
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                {/* <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th> */}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredRegistrations.map((registration) => (
                <tr key={registration.id}>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                    {registration.first_name} {registration.last_name}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{registration.email}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{registration.company || '-'}</td>
                  {/* <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {getTicketTypeBadge(registration.ticket_type)}
                  </td> */}
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {new Date(registration.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {getStatusBadge(registration.status)}
                  </td>
                  {/* <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/registrations/${registration.id}`}>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Link href={`/admin/registrations/${registration.id}/edit`}>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Mail className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleDelete(registration.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {filteredRegistrations.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No registrations found</h3>
          <p className="text-gray-500">Try changing your search or filter criteria</p>
        </div>
      )}

      <ConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Registration"
        message="Are you sure you want to delete this registration? This action cannot be undone."
        confirmText="Delete"
        type="danger"
      />
    </AppLayout>
  )
}