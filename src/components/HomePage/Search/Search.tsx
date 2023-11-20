'use client'
import React, { useCallback, useRef, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { debounce } from 'lodash'

import SearchResultList from '@/components/HomePage/Search/SearchResultList'
import { Post } from '@/models/postsModel'

interface ISearchProps {
  searchData?: Post[]
}

const Search = ({ searchData }: ISearchProps) => {
  const [inputValue, setInputValue] = useState('')
  const searchRef = useRef(null)

  const path = usePathname()

  const router = useRouter()

  const handleDebounceFn = (value: string) => {
    if (value) {
      router.replace(`${path}?search=${value}`, {
        scroll: false,
      })
    } else {
      router.replace(path, {
        scroll: false,
      })
    }
  }

  const debouncedSearch = useCallback(debounce(handleDebounceFn, 300), [])

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
    debouncedSearch(value)
  }

  const isSearching = inputValue?.length > 0

  return (
    <div
      id={'search'}
      className="w-full search-container relative max-w-2xl mb-10"
      ref={searchRef}
    >
      <div className="relative min-h-[54px]">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <label
          htmlFor="search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search something
        </label>

        <input
          type="search"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="none"
          spellCheck="false"
          name="q"
          placeholder="Search something"
          title="Search"
          role="searchbox"
          aria-label="Search"
          aria-autocomplete="list"
          required
          id="search"
          className={`block w-full outline-0 p-4 pl-10 text-sm text-gray-900 bg-white ${
            isSearching
              ? 'border border-gray-300 border-b-0'
              : 'border border-gray-300'
          }`}
          onChange={onSearch}
          value={inputValue}
        />
      </div>
      <SearchResultList
        isLoading={isSearching && !searchData}
        open={isSearching}
        data={searchData}
      />
    </div>
  )
}

export default Search
