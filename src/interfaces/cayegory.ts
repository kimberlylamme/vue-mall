interface Category {
  id: number
  mobile_name: string
  sub_menu?: Category[]
  tmenu?: []
}

export type { Category }
