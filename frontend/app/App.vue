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
                  XMarkIcon.h-6.w-6.text-white(aria-hidden='true')
            .flex-1.h-0.pt-5.pb-4.overflow-y-auto
              .flex-shrink-0.flex.items-center.px-4
                img.h-8.w-auto(src='/images/rotipay-logo-purple.gif', alt='Workflow')
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
          img.h-8.w-auto(src='/images/rotipay-logo-purple.gif', alt='Workflow')
        nav.mt-5.flex-1.px-2.bg-white.space-y-1
          a(v-for='item in navigation', :key='item.name', :href='item.href', :class="[item.current ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900', 'group flex items-center px-2 py-2 text-sm font-medium rounded-md']", @click="navChange(item)")
            component(:is='item.icon', :class="[item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500', 'mr-3 flex-shrink-0 h-6 w-6']", aria-hidden='true')
            | {{ item.name }}

  .flex.flex-col.flex-1(class='md:pl-64')
    .sticky.top-0.z-10.pl-1.pt-1.bg-gray-100(class='md:hidden sm:pl-3 sm:pt-3')
      button.h-12.w-12.inline-flex.items-center.justify-center.rounded-md.text-gray-500(type='button', class='-ml-0.5 -mt-0.5 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500', @click='openSidebar()')
        span.sr-only Open sidebar
        Bars3Icon.h-6.w-6(aria-hidden='true')
    main.flex-1
      router-view


  // Global notification live region, render this permanently at the end of the document
  .pointer-events-none.fixed.inset-0.flex.items-end.px-4.py-6(aria-live='assertive', class='sm:items-start sm:p-6')
   .flex.w-full.flex-col.items-center.space-y-4(class='sm:items-end')
     // Notification panel, dynamically insert this into the live region when it needs to be displayed
     transition(enter-active-class='transform ease-out duration-300 transition', enter-from-class='translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2', enter-to-class='translate-y-0 opacity-100 sm:translate-x-0', leave-active-class='transition ease-in duration-100', leave-from-class='opacity-100', leave-to-class='opacity-0')
       .pointer-events-auto.w-full.max-w-sm.overflow-hidden.rounded-lg.bg-white.shadow-lg.ring-1.ring-black.ring-opacity-5(v-if='alertIsVisible')
         .p-4
           .flex.items-center
             .flex.w-0.flex-1.justify-between
               p.w-0.flex-1.text-sm.font-medium.text-gray-900 {{alertMessage}}
             .ml-4.flex.flex-shrink-0
               button.inline-flex.rounded-md.bg-white.text-gray-400(type='button', @click='alertIsVisible = false', class='hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2')
                 span.sr-only Close
                 SolidXMarkIcon.h-5.w-5(aria-hidden='true')
</template>

<script>
//import {ref} from 'vue'
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import {
  UserIcon,
  Bars3Icon,
  ChartBarIcon,
  XMarkIcon,
  PencilSquareIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/vue/24/outline'

import { XMarkIcon as SolidXMarkIcon} from '@heroicons/vue/20/solid'



export default {
  components: { 
    Dialog, DialogPanel, TransitionChild, 
    TransitionRoot, XMarkIcon, Bars3Icon, SolidXMarkIcon },
  data() {
    return {
      alertMessage: "",
      alertIsVisible: false,
      navigation: [
        { name: 'Page Setup', href: '/app#/page-setup', icon: PencilSquareIcon, current: true },

        { name: 'User Settings', href: '/app#/user-settings', icon: UserIcon, current: false },
        { name: 'Payment History', href: '/app#/payment-history', icon: ChartBarIcon, current: false },
        { name: 'Logout', href: '/logout', icon: ArrowRightOnRectangleIcon, current: false }
        
      ],
      sidebarOpen: false
    };
  }, 
  mounted() {
    window.AlertManager = this.alertManager;
  },
  methods: {
    navChange: function(navItem){
      
      this.navigation.forEach(function(n){ n.current= false;});
      navItem.current = true;
    },
    openSidebar: function(){
      this.sidebarOpen = true;
    },
    
    /**
     * Shows alert notification
     * @param {Object} alertObj - {type: <String>, message: <String>, hideAfter: <Number>}
     */
    alertManager(alertObj){
      this.alertMessage = alertObj.message;
      this.alertIsVisible = true;
      var that = this;
      setInterval(function(){
        that.alertIsVisible = false;
      }, alertObj.hideAfter || 3000);
    }
  }
};
</script>

<style scoped>
</style>