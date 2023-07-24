import EditProfileComponent from '@/components/EditProfile'
import Wrapper from '@/components/UIComponents/Wrapper'

const EditProfile = async ({ params }: { params: { id: string } }) => {
  return (
    <Wrapper>
      <EditProfileComponent id={params.id} />
    </Wrapper>
  )
}

export default EditProfile
