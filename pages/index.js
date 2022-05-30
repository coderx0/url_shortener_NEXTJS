import { useRef, useState } from 'react';
import isURL from 'validator/lib/isURL';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default function Home() {
  const urlRef = useRef();
  const [error, setError] = useState(null);
  const [shortUrl, setShortUrl] = useState(null);
  const [isCopied, setIsCopied] = useState(false);

  const shortenUrl = async () => {
    const enteredUrl = urlRef.current.value; 

    if (isURL(enteredUrl)) {
      const response = await fetch('/api/shorten', {
        method: "POST",
        body: JSON.stringify({
          urlString: enteredUrl
        }),
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await response.json();

      if (data.id)
        setShortUrl(`${process.env.NEXT_PUBLIC_DOMAIN_URL}${data.id}`);
    }
    else {
      setError("Invalid URL. Please Enter valid URL.");
    }
  };


  return (
    <div className='flex flex-col gap-4 h-screen justify-center items-center'>
     <h1 className='text-[2rem] sm:text-[4rem] md:text-[5rem] font-bold mb-8'>Shorten URL</h1>
      {error && <h1 className=''>{error}</h1>}
      <h1 className='text-lg'>Enter URL</h1>
      <div>
      <input ref={urlRef} type="text" placeholder="enter url" className="input input-bordered input-primary w-[80vw] sm:w-[70vw] md:w-[60vw] lg:w-[40vw]" />
      </div>
      <button className='btn btn-success rounded-lg' onClick={shortenUrl}>Shorten</button>
      {shortUrl && <div className='flex flex-col gap-6'>
        <div className='text-sm md:text-md bg-stone-800 p-4 rounded-xl'>
          {shortUrl}
        </div>
        {isCopied ?
                              <button className='btn btn-success w-[60%] mx-auto'>Copied</button>
                              :
                              <CopyToClipboard text={shortUrl} onCopy={() => setIsCopied(true)}>
                              <button className='btn btn-info'>Copy</button>
                              </CopyToClipboard> }
        </div>}
     
    </div>
  )
}
