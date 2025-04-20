import { Button } from 'react-bootstrap'
import { toast } from 'react-toastify';
import { useUnlockPerkMutation } from '../../slices/usersApiSlice';

const EasterEggSolutionScreen = () => {

    const [unlockPerk] = useUnlockPerkMutation();

    const handleUnlock = async () => {
        try {
            await unlockPerk().unwrap();
            toast.success(
                <div>
                  ✨ You've unlocked the glowing name perk!<br />
                  <strong>EXIT and LOGIN to see the change.</strong>
                </div>
              );
        } catch (err) {
            toast.error(err?.data?.message || 'Failed to unlock perk');
        }
    };

  return <>
    <h1>Congrets!!✨ you solved the easter egg</h1>
    <h2>The riddle was not easy and you did it, well done!</h2>
    <h5 className='glow-name'>Never forget that Oran is a cactus</h5>
    <Button
        variant='warning'
        className='mt-4'
        onClick={handleUnlock}
      >
        Reveal the Power
    </Button>
  </>
}

export default EasterEggSolutionScreen
