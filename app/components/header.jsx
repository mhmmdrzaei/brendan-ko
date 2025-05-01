import Link from 'next/link';

export default function Header({ settings }) {
  const { siteTitle, mainHeadingMenu , sideHeadingMenu = [] } = settings;

  return (
    <header className="site-header">
      <div className="site-branding">
        <Link href="/">
          <h1>{siteTitle}</h1>
        </Link>
      </div>

      <nav className="main-heading-menu">
        <ul>
          {mainHeadingMenu.map((item) => {
            if (item._type === 'page') {
              return (
                <li key={item._id || item.slug?.current}>
                  <Link href={`/${item.slug?.current}`}>{item.title}</Link>
                </li>
              );
            }

            if (item._type === 'category') {
              return (
                <li key={item._id || item.slug?.current}>
                  <details>
                    <summary style={{ color: item.hexColor || 'inherit' }}>
                      {item.title}
                    </summary>
                    <ul>
                      {item.projects?.map((project) => (
                        <li key={project._id || project.slug?.current}>
                          <Link href={`/projects/${project.slug?.current}`}>
                            {project.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                </li>
              );
            }
            

            return null;
          })}
        </ul>
      </nav>

      {sideHeadingMenu.length > 0 && (
        <nav className="side-heading-menu">
          <ul>
            {sideHeadingMenu.map((item, index) => (
              <li key={index}>
                <Link href={item.linkUrl}>{item.linkTitle}</Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
