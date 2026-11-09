import type { FormSchema } from '../types/form'

// README sample response; only `validation` is added by me.
export const carFormSchema: FormSchema = {
  fields: [
    {
      label: 'برند:',
      name: 'brand',
      props: {
        color: '#000000',
        placeholder: 'برند ماشین را وارد کنید',
        type: 'text',
      },
      style: { borderRadius: '5px', margin: '10px 0', padding: '8px' },
      type: 'input',
      validation: { required: true, minLength: 2 },
    },
    {
      label: 'مدل:',
      name: 'model',
      props: {
        color: '#000000',
        placeholder: 'مدل ماشین را وارد کنید',
        size: 'medium',
        type: 'text',
      },
      style: { borderRadius: '5px', margin: '10px 0', padding: '8px' },
      type: 'input',
      validation: { required: true },
    },
    {
      label: 'سال ساخت:',
      name: 'year',
      props: {
        max: '2024',
        min: '1900',
        placeholder: 'سال ساخت را وارد کنید',
        type: 'number',
      },
      style: { borderRadius: '5px', margin: '10px 0', padding: '8px' },
      type: 'input',
      validation: { required: true },
    },
    {
      label: 'نوع سوخت:',
      name: 'fuel_type',
      props: {
        options: [
          { label: 'بنزین', value: 'بنزین' },
          { label: 'گاز', value: 'گاز' },
          { label: 'دیزل', value: 'دیزل' },
          { label: 'الکتریکی', value: 'الکتریکی' },
        ],
      },
      style: { borderRadius: '5px', margin: '10px 0', padding: '8px' },
      type: 'select',
      validation: { required: true },
    },
    {
      label: 'رنگ ماشین:',
      name: 'color',
      props: { placeholder: 'رنگ ماشین را وارد کنید', type: 'text' },
      style: { borderRadius: '5px', margin: '10px 0', padding: '8px' },
      type: 'input',
    },
    {
      label: 'تعداد مالکین قبلی:',
      name: 'previous_owners',
      props: {
        min: '0',
        placeholder: 'تعداد مالکین قبلی را وارد کنید',
        type: 'number',
      },
      style: { borderRadius: '5px', margin: '10px 0', padding: '8px' },
      type: 'input',
    },
    {
      label: 'توضیحات وضعیت فنی:',
      name: 'technical_condition',
      props: { cols: 50, placeholder: 'توضیحات درباره وضعیت فنی ماشین', rows: 4 },
      style: { borderRadius: '5px', margin: '10px 0', padding: '10px' },
      type: 'textarea',
      validation: { maxLength: 500 },
    },
    {
      label: 'تصاویر ماشین:',
      name: 'car_images',
      props: { accept: 'image/*', maxSize: '5MB', multiple: true },
      style: { margin: '10px 0' },
      type: 'file',
    },
  ],
}
