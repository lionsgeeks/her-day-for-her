"use client"


import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

export function RegistrationModal() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    ticketType: "professional",
    company: "",
    jobTitle: "",
    dietaryRestrictions: "",
    agreeTerms: false,
    agreePrivacy: false,
  })
  const [open, setOpen] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (name, checked) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const nextStep = () => {
    setStep((prev) => prev + 1)
  }

  const prevStep = () => {
    setStep((prev) => prev - 1)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, you would submit the form data to your backend here
    console.log("Form submitted:", formData)
    setOpen(false)
    // Navigate to the ticket page with the form data
    // router.push("/ticket")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="bg-[#fd5f90] hover:bg-[#fd5f90]/90 text-white">
          Get Your Tickets
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Register for Her Day for Her 2025</DialogTitle>
          <DialogDescription>
            {step === 1 && "Please provide your personal information."}
            {step === 2 && "Select your ticket type and additional information."}
            {step === 3 && "Review and confirm your registration."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First name</Label>
                  <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last name</Label>
                  <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone number</Label>
                <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label>Ticket Type</Label>
                <RadioGroup
                  defaultValue={formData.ticketType}
                  onValueChange={(value) => handleSelectChange("ticketType", value)}
                >
                  <div className="flex items-center space-x-2 border p-3 rounded-md">
                    <RadioGroupItem value="student" id="student" />
                    <Label htmlFor="student" className="flex-1">
                      Student Pass
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border p-3 rounded-md border-[#fd5f90]">
                    <RadioGroupItem value="professional" id="professional" />
                    <Label htmlFor="professional" className="flex-1">
                      Professional Pass
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border p-3 rounded-md">
                    <RadioGroupItem value="vip" id="vip" />
                    <Label htmlFor="vip" className="flex-1">
                      VIP Pass
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company/Organization</Label>
                <Input id="company" name="company" value={formData.company} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="jobTitle">Job Title</Label>
                <Input id="jobTitle" name="jobTitle" value={formData.jobTitle} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dietaryRestrictions">Dietary Restrictions</Label>
                <Select
                  onValueChange={(value) => handleSelectChange("dietaryRestrictions", value)}
                  defaultValue={formData.dietaryRestrictions}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select if applicable" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="vegetarian">Vegetarian</SelectItem>
                    <SelectItem value="vegan">Vegan</SelectItem>
                    <SelectItem value="gluten-free">Gluten-free</SelectItem>
                    <SelectItem value="other">Other (please specify)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="grid gap-4 py-4">
              <div className="space-y-4">
                <h3 className="font-medium">Registration Summary</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="font-medium">Name:</div>
                  <div>
                    {formData.firstName} {formData.lastName}
                  </div>
                  <div className="font-medium">Email:</div>
                  <div>{formData.email}</div>
                  <div className="font-medium">Phone:</div>
                  <div>{formData.phone}</div>
                  <div className="font-medium">Ticket Type:</div>
                  <div className="capitalize">{formData.ticketType} Pass</div>
                  <div className="font-medium">Company:</div>
                  <div>{formData.company || "N/A"}</div>
                  <div className="font-medium">Job Title:</div>
                  <div>{formData.jobTitle || "N/A"}</div>
                  <div className="font-medium">Dietary Restrictions:</div>
                  <div className="capitalize">{formData.dietaryRestrictions || "None"}</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="agreeTerms"
                    checked={formData.agreeTerms}
                    onCheckedChange={(checked) => handleCheckboxChange("agreeTerms")}
                    required
                  />
                  <label
                    htmlFor="agreeTerms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I agree to the terms and conditions
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="agreePrivacy"
                    checked={formData.agreePrivacy}
                    onCheckedChange={(checked) => handleCheckboxChange("agreePrivacy")}
                    required
                  />
                  <label
                    htmlFor="agreePrivacy"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I agree to the privacy policy
                  </label>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="flex justify-between">
            {step > 1 && (
              <Button type="button" variant="outline" onClick={prevStep}>
                Back
              </Button>
            )}
            <div>
              {step < 3 ? (
                <Button type="button" onClick={nextStep}>
                  Next
                </Button>
              ) : (
                <Button type="submit" className="bg-[#03329b]">
                  Complete Registration
                </Button>
              )}
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

