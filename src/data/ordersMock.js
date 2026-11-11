export const INITIAL_MOCK_ORDERS = [
  {
    id: 'SAJ-8942-LG',
    customerName: 'Adebayo Ogunlesi',
    phone: '0803 234 5678',
    date: 'Today, 08:30 AM',
    state: 'Lagos State',
    area: 'Lekki Phase 1',
    address: '14 Admiralty Way, Block B Flat 3, Lekki Phase 1, Lagos',
    mandatoryFallback: 'Enyo Filling Station Landmark by Lekki Phase 1 Entrance Gate',
    vanAccessibility: 'Limited (Estate boom barrier requires landmark meeting point if van delayed)',
    items: [
      {
        product: 'Medium Premium Broiler (2.1kg – 2.4kg)',
        quantity: 3,
        preparation: 'Kill, Defeather & Cut into Pieces',
        pieces: '8 Standard Pieces',
        gizzard: true,
        pricePerBird: 8600,
        subtotal: 25800
      }
    ],
    deliveryFee: 2500,
    totalAmount: 28300,
    paymentStatus: 'Paid (Card/Online)',
    status: 'out_for_delivery',
    driverName: 'Sunday Balogun',
    driverPhone: '0812 456 7890',
    vanPlate: 'LAG-419-XA (Chilled Refrigerated Van 03)',
    estimatedArrival: 'In 35 - 45 mins',
    currentLocation: 'Passing Civic Center / Ozumba Mbadiwe headed to Lekki Toll',
    timeline: [
      {
        step: 1,
        title: 'Order Confirmed & Payment Verified',
        time: '08:30 AM',
        completed: true,
        desc: 'Order received into SAJFarm dispatch system.'
      },
      {
        step: 2,
        title: 'Bird Selection & Weight Certification',
        time: '09:15 AM',
        completed: true,
        desc: '3 Healthy broilers selected from Coop Pen 4. Average live weight: 2.35kg.'
      },
      {
        step: 3,
        title: 'Slaughter, Defeathering & 8-Piece Butcher Cut',
        time: '10:00 AM',
        completed: true,
        desc: 'Hygienically dressed with treated spring water, portioned into 8 pieces each, gizzards preserved and ice-packed.'
      },
      {
        step: 4,
        title: 'Chilled Storage & Van Dispatch',
        time: '10:45 AM',
        completed: true,
        desc: 'Packaged in insulated thermal boxes and loaded into refrigerated delivery van.'
      },
      {
        step: 5,
        title: 'Out for Delivery (On the way to Doorstep/Fallback)',
        time: '11:15 AM',
        completed: true,
        current: true,
        desc: 'Driver Sunday is en route. If estate access is blocked, driver will call to meet at Enyo Station landmark.'
      },
      {
        step: 6,
        title: 'Delivered to Customer',
        time: 'Pending',
        completed: false,
        desc: 'Customer inspection and handover sign-off.'
      }
    ]
  },
  {
    id: 'SAJ-6104-OG',
    customerName: 'Mrs. Folake Adekoya',
    phone: '0818 901 2345',
    date: 'Today, 10:15 AM',
    state: 'Ogun State',
    area: 'Abeokuta Central',
    address: 'Plot 7, Harmony Estate, Kemta Housing, Idi-Aba, Abeokuta',
    mandatoryFallback: 'Idi-Aba Central Roundabout / Opposite FMC Hospital Gate',
    vanAccessibility: 'Accessible (Wide graded street)',
    items: [
      {
        product: 'Super Jumbo Broiler (3.0kg – 3.4kg)',
        quantity: 2,
        preparation: 'Kill & Defeather (Whole Cleaned)',
        pieces: 'Whole Bird',
        gizzard: true,
        pricePerBird: 11300,
        subtotal: 22600
      }
    ],
    deliveryFee: 2200,
    totalAmount: 24800,
    paymentStatus: 'Paid (Bank Transfer)',
    status: 'dressing_cleaning',
    driverName: 'Assigned upon van departure (Farm Logistics)',
    driverPhone: '0802 000 1122',
    vanPlate: 'OG-882-ABK',
    estimatedArrival: 'Today by 2:30 PM',
    currentLocation: 'SAJ Abattoir Section, Sagamu-Abeokuta Farm Hub',
    timeline: [
      {
        step: 1,
        title: 'Order Confirmed',
        time: '10:15 AM',
        completed: true,
        desc: 'Payment confirmed via automated bank checkout.'
      },
      {
        step: 2,
        title: 'Bird Selection & Weight Certification',
        time: '10:40 AM',
        completed: true,
        desc: '2 Heavyweight broilers weighed at 3.25kg and 3.3kg.'
      },
      {
        step: 3,
        title: 'Slaughter, Defeathering & Processing',
        time: 'In Progress',
        completed: false,
        current: true,
        desc: 'Birds currently in clean hot-scald plucking machine.'
      },
      {
        step: 4,
        title: 'Packaging & Thermal Crate Loading',
        time: 'Upcoming',
        completed: false,
        desc: 'Vacuum chilling and boxing.'
      },
      {
        step: 5,
        title: 'Van Dispatch',
        time: 'Scheduled for 1:30 PM',
        completed: false,
        desc: 'Abeokuta direct route departure.'
      },
      {
        step: 6,
        title: 'Delivered to Customer',
        time: 'Pending',
        completed: false,
        desc: 'Customer confirmation at address or Idi-Aba landmark.'
      }
    ]
  },
  {
    id: 'SAJ-3371-IB',
    customerName: 'Dr. Timothy Oyelakin',
    phone: '0703 111 8899',
    date: 'Today, 11:00 AM',
    state: 'Ibadan (Oyo State)',
    area: 'Bodija',
    address: '22 Favos Street, New Bodija, Ibadan',
    mandatoryFallback: 'Favos Junction / Opposite Housing Corporation Bodija',
    vanAccessibility: 'Road has deep drainage construction; landmark meeting requested',
    items: [
      {
        product: 'Standard Broiler (1.8kg – 2.0kg)',
        quantity: 4,
        preparation: 'Live Bird (Delivered Alive)',
        pieces: 'Live Crated',
        gizzard: false,
        pricePerBird: 6500,
        subtotal: 26000
      }
    ],
    deliveryFee: 2800,
    totalAmount: 28800,
    paymentStatus: 'Pay on Delivery (Verified)',
    status: 'order_confirmed',
    driverName: 'Alhaji Rasheed (Ibadan Courier)',
    driverPhone: '0805 776 5432',
    vanPlate: 'OYO-204-IBD',
    estimatedArrival: 'Today by 4:00 PM',
    currentLocation: 'SAJFarm Holding Pen #2',
    timeline: [
      {
        step: 1,
        title: 'Order Confirmed',
        time: '11:00 AM',
        completed: true,
        current: true,
        desc: 'Order scheduled for afternoon Ibadan van run.'
      },
      {
        step: 2,
        title: 'Live Bird Inspection & Crating',
        time: 'Scheduled 1:00 PM',
        completed: false,
        desc: 'Live broilers selected with veterinary health inspection.'
      },
      {
        step: 3,
        title: 'Crated in Ventilated Poultry Boxes',
        time: 'Scheduled 2:00 PM',
        completed: false,
        desc: 'Crated with dry wood shavings for animal welfare.'
      },
      {
        step: 4,
        title: 'Ibadan Express Van Departure',
        time: 'Scheduled 2:30 PM',
        completed: false,
        desc: 'Departing tollgate for Bodija route.'
      },
      {
        step: 5,
        title: 'Delivered to Customer Doorstep / Favos Landmark',
        time: 'Pending',
        completed: false,
        desc: 'Live bird handover.'
      }
    ]
  }
];
