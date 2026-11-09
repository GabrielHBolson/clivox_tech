import type { ContactConfig } from '../types'

/** Único local com os dados de contato usados no site. */
export const contactConfig: ContactConfig = {
  email: 'clivoxtech@gmail.com',
  whatsapp: {
    // Somente dígitos, com DDI e DDD.
    number: '5554992299323',
    defaultMessage: 'Olá! Vim pelo site da Clivox Tech e gostaria de falar sobre um projeto.',
  },
  instagram: {
    handle: 'clivox_tech',
    url: 'https://www.instagram.com/clivox_tech/',
  },
}
