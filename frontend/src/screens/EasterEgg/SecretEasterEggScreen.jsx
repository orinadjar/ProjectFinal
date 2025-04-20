import { Button, Container } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useUnlockPerkMutation } from '../../slices/usersApiSlice'

const SecretEasterEggScreen = () => {
    
  return (
    <Container className='text-center mt-5'>
        <h2>Can you find the hidden message?</h2>
        <img
        src='/images/easteregg.png'
        alt='Secret Clue'
        style={{ maxWidth: '50%', borderRadius: '12px' }}
        />
  </Container>
  )
}

export default SecretEasterEggScreen
