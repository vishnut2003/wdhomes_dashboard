import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import { ShowcaseSection } from '@/components/Layouts/showcase-section'
import { Button } from '@/components/ui-elements/button'
import { RiPencilLine } from '@remixicon/react'
import Link from 'next/link'
import React from 'react'
import AddCommentForm from './CommentForm'
import { notFound } from 'next/navigation'
import { getListingById } from '@/functions/server/listingsHelpers/getListingBySlug'
import { getAllCommentsByListingId } from '@/functions/server/listingCommentHelper/getAllByListingId'
import Comments, { CommentItemDataType } from './Comments'
import { getOneUserByUserId } from '@/functions/server/usersHelpers/getOneByUserid'
import { getListingCommentUploadFile } from '@/functions/server/listingCommentHelper/getUploadImage'
import { BufferFormatFileDataType } from '@/types/common-types'

type Props = {
  searchParams: Promise<{
    id: string,
  }>
}

const ListingCommentPage = async ({ searchParams }: Props) => {

  const listingId = (await searchParams).id;

  if (!listingId) {
    notFound();
  }

  const listing = await getListingById({ listingId });
  const comments = await getAllCommentsByListingId({ listingId });

  const commentItems: CommentItemDataType[] = [];

  for (const comment of comments) {
    const user = await getOneUserByUserId({ userId: comment.userId });
    const files: BufferFormatFileDataType[] = [];

    for (const filename of comment.files) {
      const fileData = await getListingCommentUploadFile({ filename });
      files.push(fileData);
    }

    commentItems.push({
      comment,
      files,
      user,
    })

  }

  return (
    <div>
      <div className="mx-auto w-full max-w-[1080px] space-y-5">
        <Breadcrumb pageName="Comments" />

        {/* Listing Info */}
        <ShowcaseSection
          title="Listing Informations"
          className='space-y-3'
        >
          <h1
            className='text-2xl font-bold text-black dark:text-white'
          >Listing Name: {listing.name}</h1>
          <p
            className='text-base font-bold'
          >Listing Slug: {listing.slug}</p>

          <Link
            href={`/app/listings/edit?id=${listingId}`}
            className='text-base font-semibold py-2 px-5 rounded-md bg-primary text-white flex items-center gap-3 w-max'
          >
            <RiPencilLine
              size={20}
            />
            Edit
          </Link>
        </ShowcaseSection>

        <Comments
          data={commentItems}
        />

        <ShowcaseSection
          title="Add Comment"
        >
          <AddCommentForm
            listingId={listingId}
          />
        </ShowcaseSection>

      </div>
    </div>
  )
}

export default ListingCommentPage