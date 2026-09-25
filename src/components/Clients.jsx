// src/components/Clients.jsx

import React from 'react';
import { useTranslation } from 'react-i18next';

const Clients = () => {
  const { t } = useTranslation();

  const clients = [
    { name: 'مركز الملك عبدالله بن عبدالعزيز للسيرة الذاتية', shortName: 'مركز الملك عبدالله', logo: '🏛️', category: 'حكومي' },
    { name: 'KitchenPark', shortName: 'KitchenPark', logo: '🍽️', category: 'مطاعم' },
    { name: 'مكتبة الملك عبدالعزيز العامة', shortName: 'مكتبة الملك عبدالعزيز', logo: '📚', category: 'ثقافي' },
    { name: 'آفاق', shortName: 'آفاق', logo: '🌟', category: 'تجاري' },
    { name: 'Tanweel Logistics', shortName: 'Tanweel Logistics', logo: '🚚', category: 'لوجستي' },
    { name: 'International Consulting & Services', shortName: 'ICS', logo: '💼', category: 'استشارات' },
  ];

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {t('clients.title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('clients.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clients.map((client, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
            >
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center text-3xl">
                  {client.logo}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-gray-800 mb-1 leading-tight">
                    {client.shortName}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">{client.category}</p>
                  <p className="text-xs text-gray-400 truncate">{client.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 text-lg">
            {t('clients.more')} <span className="text-blue-600 font-bold">+90</span> {t('clients.moreClients')}
          </p>
        </div>

      </div>
    </section>
  );
};

export default Clients;