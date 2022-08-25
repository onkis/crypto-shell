<template lang="pug">
div
  TransitionRoot(as='template', :show='sidebarOpen')
    Dialog.relative.z-40(as='div', class='md:hidden', @close='sidebarOpen = false')
      TransitionChild(as='template', enter='transition-opacity ease-linear duration-300', enter-from='opacity-0', enter-to='opacity-100', leave='transition-opacity ease-linear duration-300', leave-from='opacity-100', leave-to='opacity-0')
        .fixed.inset-0.bg-gray-600.bg-opacity-75
      .fixed.inset-0.flex.z-40
        TransitionChild(as='template', enter='transition ease-in-out duration-300 transform', enter-from='-translate-x-full', enter-to='translate-x-0', leave='transition ease-in-out duration-300 transform', leave-from='translate-x-0', leave-to='-translate-x-full')
          DialogPanel.relative.flex-1.flex.flex-col.max-w-xs.w-full.bg-white
            TransitionChild(as='template', enter='ease-in-out duration-300', enter-from='opacity-0', enter-to='opacity-100', leave='ease-in-out duration-300', leave-from='opacity-100', leave-to='opacity-0')
              .absolute.top-0.right-0.-mr-12.pt-2
                button.ml-1.flex.items-center.justify-center.h-10.w-10.rounded-full(type='button', class='focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white', @click='sidebarOpen = false')
                  span.sr-only Close sidebar
                  XIcon.h-6.w-6.text-white(aria-hidden='true')
            .flex-1.h-0.pt-5.pb-4.overflow-y-auto
              .flex-shrink-0.flex.items-center.px-4
                img.h-8.w-auto(src='https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600', alt='Workflow')
              nav.mt-5.px-2.space-y-1
                a(v-for='item in navigation', :key='item.name', :href='item.href', :class="[item.current ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900', 'group flex items-center px-2 py-2 text-base font-medium rounded-md']")
                  component(:is='item.icon', :class="[item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500', 'mr-4 flex-shrink-0 h-6 w-6']", aria-hidden='true')
                  | {{ item.name }}
        .flex-shrink-0.w-14
          // Force sidebar to shrink to fit close icon
  // Static sidebar for desktop
  .hidden(class='md:flex md:w-64 md:flex-col md:fixed md:inset-y-0')
    // Sidebar component, swap this element with another sidebar if you like
    .flex-1.flex.flex-col.min-h-0.border-r.border-gray-200.bg-white
      .flex-1.flex.flex-col.pt-5.pb-4.overflow-y-auto
        .flex.items-center.flex-shrink-0.px-4
          img.h-8.w-auto(src='https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600', alt='Workflow')
        nav.mt-5.flex-1.px-2.bg-white.space-y-1
          a(v-for='item in navigation', :key='item.name', :href='item.href', :class="[item.current ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900', 'group flex items-center px-2 py-2 text-sm font-medium rounded-md']")
            component(:is='item.icon', :class="[item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500', 'mr-3 flex-shrink-0 h-6 w-6']", aria-hidden='true')
            | {{ item.name }}

  .flex.flex-col.flex-1(class='md:pl-64')
    .sticky.top-0.z-10.pl-1.pt-1.bg-gray-100(class='md:hidden sm:pl-3 sm:pt-3')
      button.h-12.w-12.inline-flex.items-center.justify-center.rounded-md.text-gray-500(type='button', class='-ml-0.5 -mt-0.5 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500', @click='openSidebar()')
        span.sr-only Open sidebar
        MenuIcon.h-6.w-6(aria-hidden='true')
    main.flex-1
      router-view

  
</template>

<script>
//import {ref} from 'vue'
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import {
  UserIcon,
  MenuIcon,
  ChartSquareBarIcon,
  XIcon,
  PencilAltIcon,
  LogoutIcon
} from '@heroicons/vue/outline'



export default {
  components: { 
    Dialog, DialogPanel, TransitionChild, 
    TransitionRoot, XIcon, MenuIcon },
  data() {
    return {
      navigation: [
        { name: 'Page Setup', href: '/app#/page-setup', icon: PencilAltIcon, current: true },

        { name: 'User Settings', href: '/app#/user-settings', icon: UserIcon, current: false },
        { name: 'Payment History', href: '/app#/payment-history', icon: ChartSquareBarIcon, current: false },
        { name: 'Logout', href: '/logout', icon: LogoutIcon, current: false }
        
      ],
      sidebarOpen: false
    };
  }, 
  mounted() {},
  methods: {
    openSidebar: function(){
      this.sidebarOpen = true;
    }
  }
};
</script>

<style scoped>
</style>