import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import ANKITPANDEY from '../assets/images/ANKITPANDEY.jpg';
// import BOB from '../assets/images/BOB.jpg'; // Import Bob's image if available
// import CHARLIE from '../assets/images/CHARLIE.jpg'; // Import Charlie's image if available

const teamMembers = [
  { name: 'Ankit Pandey', role: 'Team Leader', image: ANKITPANDEY },
  // { name: 'Bob', role: 'Designer', image: BOB }, // Use correct path if available
  // { name: 'Charlie', role: 'Product Manager', image: CHARLIE }, // Use correct path if available
  // Add more team members as needed
];

const Footer = () => (
  <Box mt="80px" sx={{ backgroundColor: '#FFF3F4' }}>
    <Stack gap="40px" sx={{ alignItems: 'center' }} flexWrap="wrap" px="40px" pt="24px">
      <Typography variant="h5" sx={{ fontSize: { lg: '28px', xs: '20px' } }} textAlign="center" pb="40px">
        Made with ❤️ by Team:- Time Variance
      </Typography>
      <Stack direction="row" spacing={3} sx={{ overflowX: 'auto' }}>
        {teamMembers.map((member, index) => (
          <Box key={index} sx={{ textAlign: 'center', width: '150px' }}>
            <img src={member.image} alt={member.name} className="team-member-image" />
            <Typography variant="h6" sx={{ fontSize: '16px', mt: 1 }}>{member.name}</Typography>
            <Typography variant="body2" sx={{ fontSize: '14px' }}>{member.role}</Typography>
          </Box>
        ))}
      </Stack>
    </Stack>
  </Box>
);

export default Footer;

