
import { fetchCommunities } from "@/lib/actions/community.actions";
import { currentUser } from "@clerk/nextjs";
import CommunityCard from "../cards/CommunityCard";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import UserCard from "../cards/UserCard";


  
 async function RightSidebar({
searchParams,}: { searchParams: { [key: string]: string | undefined }; }) {
  const suggestedCommunities = await fetchCommunities({ pageSize: 1 });
let i; 

  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(user.id);
  const result = await fetchUsers({
    userId: user.id,
    searchString: "",
    pageNumber: searchParams?.page ? +searchParams.page : 1,
    pageSize: 25,
    sortBy: "desc",
  });



  return (
    <section className='custom-scrollbar rightsidebar'>
      <div className='flex flex-1 flex-col justify-start'>
        
        <h3 className='text-heading4-medium text-light-1'>
          Suggested Communities
        </h3>
  <div className=" gap-4">
        {suggestedCommunities.communities.length === 0 ? (
          <p className='no-result'>No Result</p>
        ) : (
          <>
          { suggestedCommunities.communities.map((community) => (
              <CommunityCard
                key={community.id}
                id={community.id}
                name={community.name}
                username={community.username}
                imgUrl={community.image}
                bio={community.bio}
                members={community.members}
              />
            )) }
        </>
        )}
   </div>
      </div>


      
      <div className='flex flex-1 flex-col justify-start'>
        <h3 className='text-heading4-medium text-light-1'>Similar Minds</h3>

      <div className='mt-14 flex flex-col gap-9'>
        {result.users.length === 0 ? (
          <p className='no-result'>No Result</p>
        ) : (
          <>
            {result.users.map((suggest: any) => (
            <UserCard
              key={suggest.id}
              id={suggest.id}
              name={suggest.name}
              username={suggest.username}
              imgUrl={suggest.image}
              personType='User'
            />
          ))}
          </>
        )}
        
      </div>
      </div>

    </section>
  )
  }

export default RightSidebar;