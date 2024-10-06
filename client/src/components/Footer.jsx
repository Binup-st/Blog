import React from 'react'
import { Footer } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitterX } from "react-icons/bs";
export default function FooterCom() {
  return (
    <Footer container className='border border-t-8 border-teal-500'>
      <div className='w-full max-w-7xl mx-auto'>
        <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
            <div className='mt-5'>
                <Link
                to="/"
                className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
                >
                <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
                    Sahand's
                </span>
                Blog
                </Link>
            </div>
        </div>
        <div className='grid grid-cols-2 gap-3 sm:mt-4 sm:grid-cols-3 sm:gap-3'>
            <div>
            <Footer.Title title='About' />
            <Footer.LinkGroup col>
                <Footer.Link href='http://www.google.com' target='_blank' rel='noopener noreferrer'>
                    100 JS Projects
                </Footer.Link>
                <Footer.Link href='http://www.google.com' target='_blank' rel='noopener noreferrer'>
                    Sahand's BLog
                </Footer.Link>
            </Footer.LinkGroup>
            </div>
            <div>
            <Footer.Title title='Follow us' />
            <Footer.LinkGroup col>
                <Footer.Link href='http://www.google.com' target='_blank' rel='noopener noreferrer'>
                    Github
                </Footer.Link>
                <Footer.Link href='http://www.google.com' target='_blank' rel='noopener noreferrer'>
                    Discord
                </Footer.Link>
            </Footer.LinkGroup>
            </div>
            <div>
            <Footer.Title title='Legal' />
            <Footer.LinkGroup col>
                <Footer.Link href='http://www.google.com' target='_blank' rel='noopener noreferrer'>
                    Privacy Policy
                </Footer.Link>
                <Footer.Link href='http://www.google.com' target='_blank' rel='noopener noreferrer'>
                    Terms & Conditions
                </Footer.Link>
            </Footer.LinkGroup>
            </div>
        </div>
        <Footer.Divider />
        <div>
            <Footer.Copyright href='#' by="Sahand's Blog" year={new Date().getFullYear()}/>
        </div>
        <div className='flex gap-4 justify-center mt-3'>
            <Footer.Icon href='#' icon={BsFacebook}/>
            <Footer.Icon href='#' icon={BsInstagram}/>
            <Footer.Icon href='#' icon={BsTwitterX}/>
            <Footer.Icon href='#' icon={BsGithub}/>
            <Footer.Icon href='#' icon={BsDribbble}/>

        </div>
      </div>
    </Footer>
  )
}
