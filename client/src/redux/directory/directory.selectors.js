import { createSelector } from 'reselect'

const selectDirectory = state => state.directory

export const selectMenuItems = createSelector(
    [selectDirectory],
    (directory) => directory.menuItems
)