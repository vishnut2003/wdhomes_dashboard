'use client';

import { ChevronUpIcon } from '@/assets/icons';
import InputGroup from '@/components/FormElements/InputGroup'
import { ShowcaseSection } from '@/components/Layouts/showcase-section'
import { Button } from '@/components/ui-elements/button';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import React, { useState } from 'react'

const ListingForm = () => {

    const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_CLOUD_API;

    if (!GOOGLE_API_KEY) {
        throw new Error("NEXT_PUBLIC_GOOGLE_CLOUD_API Key not found")
    }

    const [isCityDropdownOpen, setIsCityDropdownOpen] = useState<boolean>(false);
    const [attributes, setAttributes] = useState<{
        label: string,
        value: string,
    }[]>([
        {
            label: "",
            value: "",
        },
        {
            label: "",
            value: "",
        }
    ]);

    return (
        <div
            className='space-y-6'
        >
            <ShowcaseSection
                title='Listings Informations'
                className='space-y-5'
            >
                <InputGroup
                    label='Listing Name'
                    placeholder='Plot 123'
                    type='text'
                />
                <InputGroup
                    label='Price start from'
                    placeholder='100000'
                    type='number'
                />
            </ShowcaseSection>

            <ShowcaseSection
                title='Location Information'
                className='space-y-5'
            >
                <div
                    className='sm:flex flex-wrap space-y-5 sm:space-y-0'
                >
                    <InputGroup
                        label='State'
                        placeholder='State'
                        type='text'
                        className='w-full sm:w-1/2 pl-0 sm:pr-[10px]'
                    />

                    <InputGroup
                        label='City'
                        placeholder='City'
                        type='text'
                        className='w-full sm:w-1/2 pl-0 sm:pl-[10px]'
                    />
                </div>

                <LoadScript
                    googleMapsApiKey={GOOGLE_API_KEY}
                >
                    <GoogleMap
                        mapContainerStyle={{
                            width: "100%",
                            height: "400px",
                            borderRadius: "10px",
                        }}
                        zoom={11}
                        center={{
                            lat: 28.6139,
                            lng: 77.2090,
                        }}
                    ></GoogleMap>
                </LoadScript>

            </ShowcaseSection>

            <ShowcaseSection
                title='Listing Attributes'
                className='space-y-5'
            >
                {
                    attributes.map((attr, i) => (
                        <div
                            className='sm:flex flex-wrap space-y-5 sm:space-y-0'
                            key={i}
                        >
                            <InputGroup
                                label='Label'
                                placeholder='Rooms'
                                type='text'
                                className='w-full sm:w-1/2 pl-0 sm:pr-[10px]'
                            />

                            <InputGroup
                                label='Value'
                                placeholder='3'
                                type='text'
                                className='w-full sm:w-1/2 pl-0 sm:pl-[10px]'
                            />
                        </div>
                    ))
                }

                <div
                    className='flex sm:flex-row gap-5'
                >
                    <Button
                        variant={"green"}
                        label='Add Attribute'
                        shape={"rounded"}
                    />
                    <Button
                        variant={"primary"}
                        label='Add Attribute'
                        shape={"rounded"}
                    />
                </div>
            </ShowcaseSection>
        </div>
    )
}

export default ListingForm