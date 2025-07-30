'use client';

import InputGroup from '@/components/FormElements/InputGroup'
import { ShowcaseSection } from '@/components/Layouts/showcase-section'
import { Button } from '@/components/ui-elements/button';
import FileUploadUI from '@/components/ui-elements/FileUploadUI';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import React, { useState } from 'react'
import ImageGalleryUpload from './ImageGalleryUpload';

const ListingForm = () => {

    const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_CLOUD_API;

    if (!GOOGLE_API_KEY) {
        throw new Error("NEXT_PUBLIC_GOOGLE_CLOUD_API Key not found")
    }

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

    const [mapPinPos, setMapPinPos] = useState<{
        lat: number,
        lng: number,
    }>();

    return (
        <div
            className='space-y-6'
        >
            <ShowcaseSection
                title='Listings Featured Image'
            >
                <FileUploadUI />
            </ShowcaseSection>

            <ShowcaseSection
                title='Listing Gallery'
            >
                <ImageGalleryUpload />
            </ShowcaseSection>

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

                <p>Select the exact location from Google Map below</p>

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
                        onClick={(event) => {
                            const lat = event.latLng?.lat();
                            const lng = event.latLng?.lng();
                            if (!lat || !lng) {
                                return;
                            }
                            setMapPinPos({ lat, lng })
                        }}
                    >
                        {
                            mapPinPos &&
                            <Marker
                                position={mapPinPos}
                            />
                        }
                    </GoogleMap>
                </LoadScript>

            </ShowcaseSection>

            <ShowcaseSection
                title='Listing Attributes'
                className='space-y-6'
            >
                {
                    attributes.map((attr, i) => (
                        <div
                            className={`sm:flex flex-wrap space-y-5 sm:space-y-0 ${i !== 0 ? "border-t border-[#E8E8E8] dark:border-dark-3 pt-4" : ""}`}
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
                        label='Remove Attribute'
                        shape={"rounded"}
                    />
                </div>
            </ShowcaseSection>

            <div
                className='flex justify-end'
            >
                <Button
                    label='Add Listing'
                    variant={"primary"}
                    shape={"rounded"}
                />
            </div>
        </div>
    )
}

export default ListingForm