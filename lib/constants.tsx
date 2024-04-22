import {Gauge, LibraryBig, ScanIcon, ScanLine, ShoppingBag, Users} from 'lucide-react'


export const Navlinks = [
  {
    url: '/',
    icon: <Gauge />,
    label: 'Dashboard',
  },
  {
    url: '/categories',
    icon: <LibraryBig />,
    label: 'Categories',
  },{
    url: '/products',
    icon: <ShoppingBag />,
    label: 'Products',
  },
  {
    url: '/orders',
    icon: <ScanLine />,
    label: 'Orders',
  },
  {
    url: '/customers',
    icon: <Users />,
    label: 'Customers',
  }
];