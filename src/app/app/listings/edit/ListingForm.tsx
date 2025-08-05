'use client';

import InputGroup from '@/components/FormElements/InputGroup'
import { ShowcaseSection } from '@/components/Layouts/showcase-section'
import { Button } from '@/components/ui-elements/button';
import FileUploadUI from '@/components/ui-elements/FileUploadUI';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import React, { useEffect, useState } from 'react'
import InputDropdownElement from '@/components/ui-elements/InputDropdown';
import CitiesList from '@/types/CitiesLists';
import { TextAreaGroup } from '@/components/FormElements/InputGroup/text-area';
import TiptapEditor from '@/components/ui-elements/RichTextEditor';
import Image from 'next/image';
import { base64ToFile, bufferToFile, handleCatchBlock } from '@/functions/common';
import ErrorElement from '@/components/ui-elements/ErrorElement';
import SuccessElement from '@/components/ui-elements/SuccessElement';
import { RiLoaderLine } from '@remixicon/react';
import ImageGalleryUpload from '../add/ImageGalleryUpload';
import axios from 'axios';
import { GetOneListingBySlugResponseDataInterface } from '@/app/api/listing-manager/get-one-by-slug/route';
import LoadingElement from '@/components/ui-elements/LoadingElement';

const ListingForm = ({
    slug,
}: {
    slug: string,
}) => {

    const [fetchingListing, setFetchingListing] = useState<boolean>(true);

    const [error, setError] = useState<string | null>(null);
    const [inProgress, setInProgress] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);

    const [resetTipTapEditor, setResetTipTapEditor] = useState<number>(0);

    const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_CLOUD_API;

    if (!GOOGLE_API_KEY) {
        throw new Error("NEXT_PUBLIC_GOOGLE_CLOUD_API Key not found")
    }

    const [featuredImage, setFeaturedImage] = useState<File | null>(null);
    const [imageGallery, setImageGallery] = useState<File[]>([]);

    const [formData, setFormData] = useState<{
        listingName: string,
        slug: string,
        listingPrice: string,
        description: string,
        location: {
            address: string,
            state: string,
            city: string,
        }
    }>({
        listingName: "",
        slug: "",
        listingPrice: "",
        description: "",
        location: {
            address: "",
            city: "",
            state: "",
        },
    });

    const [attributes, setAttributes] = useState<{
        label: string,
        value: string,
    }[]>([
        {
            label: "",
            value: "",
        }
    ]);

    const [mapPinPos, setMapPinPos] = useState<{
        lat: number,
        lng: number,
    } | null>(null);

    useEffect(() => {
        (async () => {
            try {

                const { data } = await axios.post<GetOneListingBySlugResponseDataInterface>('/api/listing-manager/get-one-by-slug', { slug });

                if (data.images.featuredImage) {
                    const image = data.images.featuredImage;
                    const featuredImage = base64ToFile(image.buffer, image.name, image.type)
                    setFeaturedImage(featuredImage);
                }

                const galleryImage: File[] = []
                for (const image of data.images.galleryImage) {
                    const imageFile = base64ToFile(image.buffer, image.name, image.type);
                    galleryImage.push(imageFile);
                }

                setImageGallery(galleryImage);
                setAttributes(data.listingData.attributes);
                setMapPinPos(data.listingData.location.pinpoint);

                const {
                    name,
                    slug: listingSlug,
                    price,
                    description,
                    location,
                } = data.listingData;

                setFormData({
                    listingName: name,
                    slug: listingSlug,
                    listingPrice: price.toString(),
                    description: description,
                    location,
                })

            } catch (err) {
                const message = handleCatchBlock(err);
                setError(message);
            }

            setFetchingListing(false)
        })()
    }, [])

    if (fetchingListing) {
        return <LoadingElement message='Loading Listing Data...' />
    }

    return (
        <form
            className='space-y-6'
            onSubmit={async (event) => {
                event.preventDefault();
                setError(null)
                setInProgress(true)

                try {

                    setSuccess(true)
                    setTimeout(() => setSuccess(false), 5000);

                    setFormData({
                        description: '',
                        listingName: '',
                        listingPrice: '',
                        location: {
                            state: "",
                            address: "",
                            city: "",
                        },
                        slug: '',
                    })

                    setMapPinPos(null)
                    setAttributes([
                        {
                            label: "",
                            value: "",
                        }
                    ])
                    setFeaturedImage(null)
                    setImageGallery([]);
                    setResetTipTapEditor(prev => ++prev);

                } catch (err) {
                    const message = handleCatchBlock(err);
                    setError(message);
                }

                setInProgress(false);
            }}
        >
            <ShowcaseSection
                title='Listings Featured Image'
            >
                {
                    featuredImage ?
                        <div
                            className='w-full'
                        >
                            <Image
                                alt='Featured image'
                                src={URL.createObjectURL(featuredImage)}
                                width={1000}
                                height={500}
                                className='w-full h-auto rounded-md'
                            />

                            <Button
                                label='Delete Image'
                                shape={"rounded"}
                                size={"small"}
                                className='mt-5'
                                onClick={() => {
                                    setFeaturedImage(null);
                                }}
                                type='button'
                            />
                        </div>
                        : <FileUploadUI
                            setFiles={setFeaturedImage}
                        />
                }
            </ShowcaseSection>

            <ShowcaseSection
                title='Listing Gallery'
            >
                <ImageGalleryUpload
                    images={imageGallery}
                    setImages={setImageGallery}
                />
            </ShowcaseSection>

            <ShowcaseSection
                title='Listing Informations'
                className='space-y-5'
            >
                <InputGroup
                    label='Listing Name'
                    placeholder='Plot 123'
                    type='text'
                    value={formData.listingName}
                    handleChange={(event) => {
                        setFormData(prev => ({
                            ...prev,
                            listingName: event.target.value,
                        }));
                    }}
                />
                <InputGroup
                    label='Listing Slug'
                    placeholder='plot-123'
                    type='text'
                    value={formData.slug}
                    handleChange={(event) => {
                        const value = event.target.value.toLowerCase().split(' ').join('-')
                        setFormData(prev => ({
                            ...prev,
                            slug: value,
                        }));
                    }}
                />
                <InputGroup
                    label='Price start from'
                    placeholder='100000'
                    type='number'
                    value={formData.listingPrice}
                    handleChange={(event) => {
                        setFormData(prev => ({
                            ...prev,
                            listingPrice: event.target.value,
                        }));
                    }}
                />
            </ShowcaseSection>

            <ShowcaseSection
                title='Listing Description'
            >
                {
                    formData.description &&
                    <TiptapEditor
                        value={formData.description}
                        reset={resetTipTapEditor}
                        setValue={(html) => {
                            setFormData(prev => ({
                                ...prev,
                                description: html,
                            }))
                        }}
                        disableUseEffect={true}
                    />
                }
            </ShowcaseSection>

            <ShowcaseSection
                title='Location Information'
                className='space-y-5'
            >
                <div
                    className='sm:flex flex-wrap space-y-5 sm:space-y-0 gap-y-3'
                >
                    <InputGroup
                        label='State'
                        placeholder='State'
                        type='text'
                        className='w-full sm:w-1/2 pl-0 sm:pr-[10px]'
                        value={formData.location.state}
                        handleChange={(event) => {
                            setFormData(prev => ({
                                ...prev,
                                location: {
                                    ...prev.location,
                                    state: event.target.value,
                                }
                            }));
                        }}
                    />

                    <InputDropdownElement
                        label='City'
                        options={CitiesList}
                        placeholder='City'
                        className='w-1/2'
                        valueOnChange={(value) => {
                            setFormData(prev => ({
                                ...prev,
                                location: {
                                    ...prev.location,
                                    city: value,
                                }
                            }));
                        }}
                    />

                    <TextAreaGroup
                        label='Address'
                        placeholder='Address'
                        className='w-full'
                        value={formData.location.address}
                        onChange={(event) => {
                            setFormData(prev => ({
                                ...prev,
                                location: {
                                    ...prev.location,
                                    address: event.target.value,
                                }
                            }))
                        }}
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
                                value={attr.label}
                                handleChange={(event) => {
                                    setAttributes(prev => {
                                        const prevCopy = [...prev];
                                        prevCopy[i].label = event.target.value;
                                        return [...prevCopy];
                                    })
                                }}
                            />

                            <InputGroup
                                label='Value'
                                placeholder='3'
                                type='text'
                                className='w-full sm:w-1/2 pl-0 sm:pl-[10px]'
                                value={attr.value}
                                handleChange={(event) => {
                                    setAttributes(prev => {
                                        const prevCopy = [...prev];
                                        prevCopy[i].value = event.target.value;
                                        return [...prevCopy];
                                    })
                                }}
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
                        type='button'
                        shape={"rounded"}
                        onClick={() => {
                            setAttributes(prev => {
                                const prevCopy = [...prev];
                                prevCopy.push({
                                    label: "",
                                    value: "",
                                });
                                return [...prevCopy];
                            })
                        }}
                    />
                    <Button
                        variant={"primary"}
                        label='Remove Attribute'
                        type='button'
                        shape={"rounded"}
                        onClick={() => {
                            setAttributes(prev => {
                                if (prev.length > 1) {
                                    const prevCopy = [...prev];
                                    prevCopy.pop();
                                    return [...prevCopy];
                                } else {
                                    return prev;
                                }
                            })
                        }}
                    />
                </div>
            </ShowcaseSection>

            {
                error &&
                <ErrorElement
                    message={error}
                />
            }

            {
                success &&
                <SuccessElement
                    message={"Listing added"}
                />
            }

            <div
                className='flex justify-end'
            >
                <Button
                    label={inProgress ? "Loading..." : 'Add Listing'}
                    variant={"primary"}
                    shape={"rounded"}
                    className='disabled:opacity-60'
                    icon={
                        inProgress &&
                        <RiLoaderLine
                            size={20}
                            className='animate-spin'
                        />
                    }
                    disabled={inProgress}
                />
            </div>
        </form>
    )
}

export default ListingForm