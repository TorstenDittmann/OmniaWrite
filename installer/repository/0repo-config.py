# The URL of the directory which will host the repository (feeds, keys, stylesheets and catalogue).
REPOSITORY_BASE_URL = "http://backend.omniawrite.com/"

# The GPG secret key which 0repo should use to sign the generated feeds. The
# fingerprint preceeded by "0x" is the most precise way to identity a key (see
# "HOW TO SPECIFY A USER ID" in the gpg(1) man-page for other options). Set
# this to None to disable GPG signing (e.g., for testing).
GPG_SIGNING_KEY = "0x6B9AF86596226571FB363EC5F79219AAB7B1370C"

# Controls whether 0repo should sign Git commits it makes.
# Will use the same GPG secret key specified above.
# Has no effect when GPG_SIGNING_KEY is set to None.
SIGN_COMMITS = True

# If set, XML feeds in the "incoming" directory and any Git pull requests must be signed by one of
# these keys, otherwise they will be rejected. For local use, this can be set to None so that the
# files don't need to be signed.
CONTRIBUTOR_GPG_KEYS = None
#CONTRIBUTOR_GPG_KEYS = { "DA9825AECAD089757CDABD8E07133F96CA74D8BA" }


# Some Python imports (needed for the code below) - you can leave these alone
import os
from repo import paths
import subprocess
from os.path import join


#### Feed hosting ####

# Copy everything in './public' to REPOSITORY_BASE_URL
# e.g. so that public/catalog.xml can be downloaded as REPOSITORY_BASE_URL/catalog.xml
# 'files' is the set of files maintained by 0repo, which may be useful if you want to
# sync just those, commit them to Git, etc. Pathnames are relative to 'public', which is
# also the current directory.
# 'message' can be used if you want to log the reason for the update.
def upload_public_dir(files, message):
	# Example 1: just ask the user to upload manually
	print("Now copy {public} to {url}".format(public = os.getcwd(), url = REPOSITORY_BASE_URL))
	raw_input("Press Return when done (edit 0repo-config.py:upload_public_dir() to automate this)")

	# Example2: use a Git repository to sync to the hosting server
	#
	# A post-receive hook at the remote end can be used to check out the new version automatically.
	# Assuming you push to the 'master' branch and the working copy is some other branch (e.g. 'live'):
	#
	# Create a new repository, with the 'live' branch checked out:
	#
	# git init
	# git commit --allow-empty -m 'Created new repository'
	# git checkout -b live master
	#
	# Create .git/hooks/post-receive containing:
	#
	# #!/bin/sh
	# unset GIT_DIR; cd .. && git merge --ff-only master
	#
	# Make it executable:
	#
	# chmod a+x .git/hooks/post-receive
	#
	# Clone it as the "public" directory on your local machine (remove the empty one first).
	#
	# Change this "if 1" to enable:
	if 0:
		# Make sure Git is tracking any new files
		subprocess.check_call(['git', 'add', '--'] + files)
		# Display full diffs for modified files (excludes new files)
		subprocess.check_call(['git', 'diff', '--diff-filter=M', 'HEAD', '--'] + files)
		# Display a summary of all changes (including new files)
		changed = subprocess.call(['git', 'diff', '--exit-code', '--stat', 'HEAD', '--'] + files)
		if changed:
			raw_input("Press Return to commit and push the above changes. CTRL-C to abort.")
			subprocess.check_call(['git', 'commit', '-m', message, '--'] + files)
			subprocess.check_call(['git', 'push'])
		else:
			print("No changes to public, so not pushing.")

#### Archive hosting ####

# The URL of the directory containing the archives (which will not be under REPOSITORY_BASE_URL if
# you are hosting archives on a different server). Note that uploaders can choose whether to store
# archives within 0repo or externally. This setting does not affect external archives, only archives
# managed by 0repo.
ARCHIVES_BASE_URL = REPOSITORY_BASE_URL + "archives/"

# Where to keep copies of the archives we upload.
LOCAL_ARCHIVES_BACKUP_DIR = "archive-backups/"

# At what URL under ARCHIVES_BASE_URL should this NEW file/archive be served?
#
# Note: Changing this does not affect archives which have already been uploaded;
#	to relocate an existing archive, edit archives.db instead.
#
# Note: There may be multiple archives/files for a single version, so you
#	probably want to keep archive_basename in the final URL.
def get_archive_rel_url(archive_basename, impl):
	# Example 1 (default)		e.g. http://.../myprog-1.0.tar.bz2
	return archive_basename

	# Example 2 (SourceForge)	e.g. http://.../myprog/1.0/myprog-1.0.tar.bz2
	return "{program}/{version}/{archive}".format(
		program = impl.feed.get_name().replace(' ', '-'),
		version = impl.get_version(),
		archive = archive_basename)

# Upload these new archives to the file server.
# For each archive in the list:
#   archive.source_path = path to local archive to be uploaded (in LOCAL_ARCHIVES_BACKUP_DIR)
#   archive.rel_url = result from get_archive_rel_url() above
# If any target files already exist, overwrite them (we will retry if uploading
# fails part way through).
def upload_archives(archives):
	for dir_rel_url, files in paths.group_by_target_url_dir(archives):
		# Delete this next line and all but one of the examples below.
		raise Exception("No upload method specified: edit upload_archives() in 0repo-config.py")

		# Example 1 : simple copy to local web-server directory
		archives_local_dir = "/home/me/public_html/archives/"
		subprocess.check_call(["cp", "--"] + files + [join(archives_local_dir, dir_rel_url)])

		# Example 2 : scp to remote server
                subprocess.check_call(["scp", "--"] + files + [join("me@myserver:/home/me/webapps/myrepo/archives/" + dir_rel_url)])

		# Example 3 : upload to SourceForge file release system
		user = 'sf-user-name'
		project = 'sf-project-name'
		path = '/home/frs/project/{p}/{pr}/{project}/{dir_rel_url}/'.format(
			p = project[0],
			pr = project[:2],
			project = project,
			dir_rel_url = dir_rel_url)
		cmd = ['rsync', '-avP', '--progress', '-e', 'ssh'] + files + \
			[user + ',' + project + '@frs.sourceforge.net:' + path]
		print ' '.join(cmd)
		subprocess.check_call(cmd)

# Recalculate the manifest digests specified for local archives in incoming feeds to ensure the are correct.
# You can set this to False if you trust all contributors to create correct feeds.
CHECK_DIGESTS = True


#### Custom checks and rules ####

# When adding a new implementation to the repository, this function is called to check that
# it meets the repository policies. Return a string explaining the problem, if any.
def check_new_impl(impl):
	# Example: disallow in-progress version numbers (e.g. "1.2-pre")
	version = impl.get_version()
	if not version[-1].isdigit():
		return "Version number must end in a digit (got {version})".format(version = version)

	# Example: Must have a release date
	released = impl.metadata.get('released', None)
	if not released:
		return "Missing 'released' attribute"

	# Example: Must have a license
	license = impl.metadata.get('license', None)
	if not license:
		return "Missing 'license' attribute"

	# Example: License must be OSI approved
	#if not license.startswith('OSI Approved :: '):
	#	return "Only Open Source software is permitted in this repository (license must start 'OSI Approved :: ')"

	return None

# Prompt about old implementations that remain in the "testing" stability level for too long.
# Set this to False if you intend to permanently mark releases as testing, e.g., release candidates.
TRACK_TESTING_IMPLS = True

#### Repository Layout (advanced) ####

# If you're creating a new repository, you should just use the defaults here.
# If you're switching an existing repository over to 0repo, these settings
# allow you to keep your existing naming scheme.

# uri_rel_path is the part of the feed's URL following REPOSITORY_BASE_URL.
# Where should it be placed within "feeds"? By default, these are the same.
# You might want to change this if you have a strange naming scheme (e.g. feed
# URLs ending in "/" or without an extension). The result must end in '.xml'.
def get_feeds_rel_path(uri_rel_path):
	return uri_rel_path.replace('/', os.sep)

# A source feed "feeds/games/my-game.xml" has a relative path of
# "games/my-game.xml". Where should the corresponding generated (signed) feed
# be placed under "public"? The default (and recommended) setting is to keep it
# the same, so we would generate "public/games/my-game.xml" in this case.
#
# When migrating an existing repository with a different scheme, you might need to
# change this function. For example, some repositories save the generated feed
# as "public/games/my-game/feed.xml" and configure Apache to make it appear as
# "http://example.com/games/my-game".
def get_public_rel_path(feeds_rel_path):
	return feeds_rel_path

# When 0install fetches a feed http://.../prog.xml, it looks for the GPG key
# at http://.../KEY.gpg.
#
# Normally, 0repo should place a symlink to the key in the same directory as
# the feed file (from get_public_rel_path); use "." for that.
#
# If you have one feed per directory (e.g. .../prog/feed.xml with some Apache
# configuration to make them appear as http://.../prog) then 0repo needs to
# place the key in the parent directory ("..") instead.
#
# Finally, if you use mod_rewrite so that all key requests are routed to the
# right place automatically by Apache, you can set this to None and avoid
# generating any symlinks.
GPG_PUBLIC_KEY_DIRECTORY = "."

# 0repo normally does an HTTP HEAD request to check that the archive has been
# uploaded correctly. If your server doesn't support HEAD requests (e.g. Google
# code), you might want to disable this check, or implement your own test instead:

# This for archives uploaded and managed by 0repo itself.
#def check_uploaded_archive(archive, url): pass

# As check_uploaded_archive, but for external archives.
#def check_external_archive(archive, url): pass
