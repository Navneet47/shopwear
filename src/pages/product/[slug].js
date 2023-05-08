import { useRouter } from 'next/router';
import React from 'react'

function Slug() {
  const router = useRouter();
  const {slug} = router.query;

  return <a>Post: {slug}</a>
}

export default Slug;