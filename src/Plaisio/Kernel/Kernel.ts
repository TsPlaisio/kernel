import * as $ from 'jquery';

/**
 * The TypeScript kernel of PhpPlaisio.
 */
export class Kernel
{
  //--------------------------------------------------------------------------------------------------------------------
  /**
   * Event triggered when all modules are loaded.
   */
  public static readonly eventTypeAllModulesLoaded: string = '2a6aedda-9abd-4490-898d-d7acc898cc29';

  /**
   * Event triggered when a beefy HTMl snippet has been added to the HTML document.
   */
  public static readonly eventTypeBeefyHtmlAdded: string = 'b65beb48-c06e-4bff-93cb-2dc6b5b4b619';

  //--------------------------------------------------------------------------------------------------------------------
  /**
   * Object constructor.
   */
  public constructor()
  {
    this.installObservers();
    Kernel.triggerAllModulesLoaded();
  }

  //--------------------------------------------------------------------------------------------------------------------
  /**
   * Triggers Kernel.eventTypeAllModulesLoad after all modules are loaded.
   */
  private static triggerAllModulesLoaded(): void
  {
    // @ts-ignore
    if (requirejs.s && $.isEmptyObject(requirejs.s.contexts._.registry))
    {
      $('body').trigger(Kernel.eventTypeAllModulesLoaded);
    }
    else
    {
      setTimeout(Kernel.triggerAllModulesLoaded, 25);
    }
  }

  //--------------------------------------------------------------------------------------------------------------------
  /**
   * Installs all observers.
   */
  private installObservers(): void
  {
    const $body = $('body');
    $body.on(Kernel.eventTypeAllModulesLoaded, function ()
    {
      $body.trigger(Kernel.eventTypeBeefyHtmlAdded, $body);
    });
  }

  //--------------------------------------------------------------------------------------------------------------------
}

//----------------------------------------------------------------------------------------------------------------------
// Plaisio\Console\Helper\TypeScript\TypeScriptMarkHelper::md5: 4a73d8ce1fd9bc53e55381e1c4773007
