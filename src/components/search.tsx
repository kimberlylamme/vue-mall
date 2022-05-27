import type { Ref } from 'vue'
import { SearchIcon } from './svg'

const Search = ({
  word,
  onSearch = (f: string | null) => f,
}: {
  word: Ref<string>
  onSearch: Function
}) => {
  return (
    <div class="relative">
      <input
        type="text"
        class="w-full rounded-3xl border border-solid border-gray-300 px-4 py-1 text-gray-700 outline-none"
        placeholder="Search..."
        name="search"
        value={word.value}
        onInput={(e: any) => {
          word.value = e.target.value
        }}
      />
      <div class="absolute right-2 top-1 z-10 text-gray-400" onClick={() => onSearch()}>
        <SearchIcon />
      </div>
    </div>
  )
}

export default Search
