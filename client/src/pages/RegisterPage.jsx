import RegisterForm from '../components/auth/RegisterForm';

const RegisterPage = () => (
  <div style={{
    minHeight: '100vh', background: 'linear-gradient(135deg, #0F1337, #1A1F4B, #2D1B69)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: '6rem 1.5rem 2rem', position: 'relative', overflow: 'hidden',
  }}>
    {[{ size: 400, top: '-10%', left: '-10%', color: 'rgba(255,107,53,0.1)' }, { size: 300, bottom: '-10%', right: '-5%', color: 'rgba(139,92,246,0.1)' }].map((orb, i) => (
      <div key={i} style={{ position: 'absolute', width: orb.size, height: orb.size, borderRadius: '50%', background: `radial-gradient(circle, ${orb.color}, transparent)`, filter: 'blur(60px)', top: orb.top, left: orb.left, bottom: orb.bottom, right: orb.right, pointerEvents: 'none' }} />
    ))}
    <div style={{ position: 'relative', zIndex: 1, width: '100%' }}><RegisterForm /></div>
  </div>
);

export default RegisterPage;
