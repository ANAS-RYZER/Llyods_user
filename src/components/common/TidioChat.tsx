'use client';

import { useEffect } from 'react';

interface TidioChatProps {
  tidioId?: string;
}

const TidioChat: React.FC<TidioChatProps> = ({ 
  tidioId = 'djseuz1697xtey30po0bjjnrteetiueh' 
}) => {
  useEffect(() => {
    // Check if Tidio script is already loaded
    if (document.querySelector(`script[src*="code.tidio.co/${tidioId}"]`)) {
      return;
    }

    // Create and append the Tidio script
    const script = document.createElement('script');
    script.src = `//code.tidio.co/${tidioId}.js`;
    script.async = true;
    script.id = 'tidio-script';
    
    document.head.appendChild(script);

    // Cleanup function to remove script when component unmounts
    return () => {
      const existingScript = document.getElementById('tidio-script');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [tidioId]);

  return null; // This component doesn't render anything visible
};

export default TidioChat;