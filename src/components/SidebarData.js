import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';

export const SidebarData = [
  {
    title: 'เขตเลือกตั้งทั้งหมด',
    path: '/overview',
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'แขวงทั้งหมด',
        path: '/overview/users',
        icon: <IoIcons.IoIosPaper />
      },
      // {
      //   title: 'Revenue',
      //   path: '/overview/revenue',
      //   icon: <IoIcons.IoIosPaper />
      // }
    ]
  },
  {
    title: 'เขตเลือกตั้งจตุจักร',
    path: '/reports',
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'แขวงลาดยาว',
        path: '/reports/reports1',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'แขวงจอมพล',
        path: '/reports/reports2',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'แขวงจตุจักร',
        path: '/reports/reports3',
        icon: <IoIcons.IoIosPaper />
      }
    ]
  },
  // {
  //   title: 'Products',
  //   path: '/products',
  //   icon: <FaIcons.FaCartPlus />
  // },
  {
    title: 'เขตเลือกตั้งหลักสี่',
    path: '/messages',
    icon: <FaIcons.FaEnvelopeOpenText />,

    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'แขวงทุ่งสองห้อง',
        path: '/messages/message1',
        icon: <IoIcons.IoIosPaper />
      },
      // {
      //   title: 'Message 2',
      //   path: '/messages/message2',
      //   icon: <IoIcons.IoIosPaper />
      // }
    ]
  },
  // {
  //   title: 'Support',
  //   path: '/support',
  //   icon: <IoIcons.IoMdHelpCircle />
  // }
  {
    title: 'VoteSend',
    path: '/vote',
    icon: <IoIcons.IoMdPeople />
  },
];
