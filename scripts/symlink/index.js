#!/usr/bin/env node

const { promises: { mkdir, symlink } } = require('fs')
const { join } = require('path')
const exists = require('../lib/exists')
const ROOT = join(__dirname, '..', '..')

start(ROOT, 'esm', 'cjs', 'browser')

async function start (ROOT, ...directories) {
  await Promise.all(
    directories.map(
      dir => async () => {
        const modules = join(ROOT, 'tests', dir, 'node_modules')
        const destination = join(modules, 'isbot')
        if (await exists(destination)) {
          return
        }
        await mkdir(
          modules, { recursive: true }
        )
        try {
          await symlink(ROOT, destination, 'dir')
        } catch (error) {
          if (error.code === 'EEXIST') {
            return
          }
          throw error
        }
      }
    ).map(fn => fn())
  )
}
