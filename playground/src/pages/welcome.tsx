import { Center } from '@peapods/material';
import PageBillboard from '../components/page-billboard';
import Seeds from '../components/seeds';

export default function WelcomePage() {
  return (
    <Center height="calc(100vh - 64px - 48px)">
      <PageBillboard
        image={<Seeds />}
        title="Welcome to the Playground"
        subtitle="Peapods Packets"
        description="Explore our components and design patterns. This playground was created to help you understand and test the components of our Design System."
      />
    </Center>
  );
}
