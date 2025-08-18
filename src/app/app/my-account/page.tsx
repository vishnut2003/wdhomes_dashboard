import { authOption } from '@/app/api/auth/[...nextauth]/authOptions';
import { PersonalInfoForm } from '@/app/pages/settings/_components/personal-info';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import { getOneUserByUserId } from '@/functions/server/usersHelpers/getOneByUserid';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: "Account Settings",
};

const MyAccountPage = async () => {

  const userSession = await getServerSession(authOption);

  if (!userSession) {
    notFound();
  }

  const user = await getOneUserByUserId({ userId: userSession.user.id });

  if (!user) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-[1080px]">
      <Breadcrumb pageName="Settings" />

      <div className="w-full">
        <div className="w-full">
          <PersonalInfoForm
            fullname={user.fullname}
            nickname={user.nickname}
            username={user.username}
            email={user.email}
            userId={user.userId}
          />
        </div>
      </div>
    </div>
  )
}

export default MyAccountPage