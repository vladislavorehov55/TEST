const URL_SMALL_DATASET = 'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}';
const URL_BIG_DATASET = 'http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}';
let users = [{
    id: 101,
        firstName: 'b',
    lastName: 'Corson',
    email: 'DWhalley@in.gov',
    phone: '(612)211-6296',
    address: {
    streetAddress: '9792 Mattis Ct',
        city: 'Waukesha',
        state: 'WI',
        zip: '22178'
},
    description: 'et lacus magna dolor...',
},
{
    id: 102,
        firstName: 'aa',
    lastName: 'Corson',
    email: 'DWhalley@in.gov',
    phone: '(612)211-6296',
    address: {
    streetAddress: '9792 Mattis Ct',
        city: 'Waukesha',
        state: 'WI',
        zip: '22178'
},
    description: 'et lacus ',
}]
const USER_PER_PAGE = 50;
export {URL_SMALL_DATASET,URL_BIG_DATASET, users, USER_PER_PAGE}