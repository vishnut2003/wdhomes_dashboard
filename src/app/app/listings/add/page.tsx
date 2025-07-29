import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import InputGroup from '@/components/FormElements/InputGroup'
import { ShowcaseSection } from '@/components/Layouts/showcase-section'
import { Metadata } from 'next'
import React from 'react'
import {
  Dropdown,
  DropdownContent,
  DropdownTrigger,
} from "@/components/ui/dropdown";
import Link from 'next/link'
import ListingForm from './ListingForm'

export const metadata: Metadata = {
  title: "Add Listings",
}

const AddListingsPage = () => {
  return (
    <div>
      <div className="mx-auto w-full max-w-[1080px]">
        <Breadcrumb pageName="Add Listings" />
        <ListingForm/>
      </div>
    </div>
  )
}

export default AddListingsPage