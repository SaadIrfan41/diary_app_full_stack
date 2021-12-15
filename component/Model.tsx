//@ts-ignore
import Modal from '@material-tailwind/react/Modal'
//@ts-ignore
import ModalHeader from '@material-tailwind/react/ModalHeader'
//@ts-ignore
import ModalBody from '@material-tailwind/react/ModalBody'
//@ts-ignore
import ModalFooter from '@material-tailwind/react/ModalFooter'
//@ts-ignore
import Button from '@material-tailwind/react/Button'
import { useMutation } from '@apollo/client'
import { gql } from '@apollo/client/core'
import { Diary } from '../pages/diary/[diaryid]'
import { useRouter } from 'next/router'
import Router from 'next/router'
import { toast } from 'react-toastify'
import { useDeleteEntryMutation } from '../store/rtkapi'

// const Delete_Entry = gql`
//   mutation deleteEntry($deleteEntryId: ID!) {
//     deleteEntry(id: $deleteEntryId)
//   }
// `
// const Entries = gql`
//   query getEntries {
//     getEntries {
//       tittle
//       id
//       description
//     }
//   }
// `

const Model = ({
  showModal,
  setShowModal,
  modelheader,
  modelbody,
  modelbuttonright,
  modelbuttonleft,
  deleteid,
}: any) => {
  const router = useRouter()
  const { diaryid } = router.query
  console.log('DIARY ID', diaryid)
  // const [deleteEntry] = useMutation(Delete_Entry, {
  //   refetchQueries: [
  //     { query: Diary, variables: { getDiaryId: diaryid } },
  //     { query: Entries },
  //   ],
  // })
  const [
    deleteEntry, // This is the mutation trigger
    result, // This is the destructured mutation result
  ] = useDeleteEntryMutation()
  const handelclick = async () => {
    // console.log(deleteid)
    const res = await deleteEntry({
      deleteEntryId: deleteid,
    })
    console.log(res)
    setShowModal(false)
    toast.success('Entry Deleted')
    Router.push(`/diary/${diaryid}`)
  }
  return (
    <div>
      <Modal size='sm' active={showModal} toggler={() => setShowModal(false)}>
        <ModalHeader toggler={() => setShowModal(false)}>
          {modelheader}
        </ModalHeader>
        <ModalBody>
          <p className='text-base leading-relaxed text-gray-600 font-normal'>
            {modelbody}
          </p>
        </ModalBody>
        <ModalFooter>
          {modelbuttonleft ? (
            <Button color='red' onClick={() => handelclick()} ripple='light'>
              {modelbuttonleft}
            </Button>
          ) : (
            ''
          )}
          <Button
            color='red'
            buttonType='link'
            onClick={() => setShowModal(false)}
            ripple='dark'
          >
            {modelbuttonright}
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default Model
