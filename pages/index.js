import { useRef, useState } from 'react';
import isURL from 'validator/lib/isURL';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Loading from '../components/Loading';

export default function Home() {
  const urlRef = useRef();
  const [error, setError] = useState(null);
  const [shortUrl, setShortUrl] = useState(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const shortenUrl = async () => {
    const enteredUrl = urlRef.current.value; 

    if (isURL(enteredUrl)) {
      setIsLoading(true);
      setIsCopied(false);
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
      setIsLoading(false);
    }
    else {
      setError("Invalid URL. Please Enter valid URL.");
    }
  };


  return (
    <>
      <div className="grid grid-cols-6 gap-4 pt-16">
        
        <div className="col-start-2 col-span-4 mt-12">
        <h1 className='text-[2rem] sm:text-[4rem] md:text-[5rem] font-bold mb-8 text-center'>Shorten URL</h1>
        </div>

        <h1 className='col-start-2 col-span-4 text-center md:text-xl bg-stone-800 p-4'>
          {error?error:'Enter URL'}
       </h1>
     

        <div className="col-start-2 col-span-4 flex flex-col justify-center items-center gap-4">
        <input ref={urlRef} type="text" placeholder="enter url" className="input input-bordered input-primary w-full md:text-xl" />
        <button className='btn btn-success rounded-lg' onClick={shortenUrl}>Shorten</button>
        </div>

        <div className="col-start-1 col-end-7">
        {isLoading && <Loading/>}
        {shortUrl && <div className='flex flex-col md:flex-row gap-6 items-center justify-center'>
       {!isLoading && <div className='text-sm md:text-md bg-stone-800 p-4 rounded-xl'>
          {shortUrl}
            </div>}
            {
              (isCopied && !isLoading) && <button className='btn btn-success w-24 rounded-lg'>Copied</button>
            }
           
            {(!isLoading && !isCopied) && <CopyToClipboard text={shortUrl} onCopy={() => setIsCopied(true)}>
                              <button className='btn btn-info w-24 rounded-lg'>Copy</button>
            </CopyToClipboard>}
        </div>}
  </div>
</div>

   </>
  )
}
