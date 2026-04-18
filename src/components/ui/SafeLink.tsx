import React, { useState } from "react";
import { motion } from "motion/react";

export const SafeLink = ({ href, children, className, whileHover, transition, ...props }: any) => {
  const [isChecking, setIsChecking] = useState(false);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (!href || href === "#") {
      window.dispatchEvent(new CustomEvent('show-toast', { detail: "This link is currently unavailable." }));
      return;
    }

    setIsChecking(true);
    
    let attempt = 0;
    const maxRetries = 2;
    let success = false;
    let errorMessage = "Unable to verify link.";
    let shouldOpenAnyway = false;

    while (attempt <= maxRetries && !success) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6000); // 6s timeout
        
        const res = await fetch(`https://api.codetabs.com/v1/proxy/?quest=${encodeURIComponent(href)}`, {
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);

        if (res.ok) {
          success = true;
          window.open(href, "_blank", "noopener,noreferrer");
          break;
        } else {
          if (res.status === 404) {
            errorMessage = "This link is broken (404 Not Found).";
            break; // No point retrying a 404
          } else if (res.status >= 500) {
            errorMessage = `Server error (${res.status}).`;
            // Will retry on 5xx errors
          } else {
            errorMessage = `Link unavailable (Status: ${res.status}).`;
            break; // Don't retry 4xx errors
          }
        }
      } catch (err: any) {
        if (err.name === 'AbortError') {
          errorMessage = "Connection timed out.";
        } else {
          // If the proxy itself is blocked by CORS or network issues, we fallback to opening the link
          shouldOpenAnyway = true;
          break;
        }
      }
      
      attempt++;
      if (!success && attempt <= maxRetries && !shouldOpenAnyway) {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1s before retrying
      }
    }

    if (!success) {
      if (shouldOpenAnyway) {
        window.open(href, "_blank", "noopener,noreferrer");
      } else {
        window.dispatchEvent(new CustomEvent('show-toast', { 
          detail: `${errorMessage} ${attempt > 1 ? '(After retries)' : ''}`.trim() 
        }));
      }
    }

    setIsChecking(false);
  };

  return (
    <motion.a 
      href={href} 
      onClick={handleClick} 
      className={`${className} ${isChecking ? 'opacity-50 cursor-wait' : ''}`}
      whileHover={whileHover}
      transition={transition}
      {...props}
    >
      {children}
    </motion.a>
  );
};
